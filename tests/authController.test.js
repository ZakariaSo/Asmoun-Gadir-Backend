import { jest } from '@jest/globals';

process.env.JWT_SECRET = 'test_secret';

jest.unstable_mockModule('../src/models/User.js', () => ({
    default: {
        create: jest.fn(),
        findOne: jest.fn(),
        findByPk: jest.fn(),
    }
}));

jest.unstable_mockModule('bcrypt', () => ({
    default: {
        hash: jest.fn(),
        compare: jest.fn(),
    }
}));

jest.unstable_mockModule('jsonwebtoken', () => ({
    default: {
        sign: jest.fn(),
    }
}));

const { register, login } = await import('../src/controllers/authController.js');
const { default: User } = await import('../src/models/User.js');
const { default: bcrypt } = await import('bcrypt');
const { default: jwt } = await import('jsonwebtoken');


describe('Auth Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.clearAllMocks();
    });

    describe('register', () => {
        it('should create a new user and return 201', async () => {
            req.body = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                role: 'touriste'
            };

            bcrypt.hash.mockResolvedValue('hashed_password');
            User.create.mockResolvedValue({
                id: 1,
                name: 'Test User',
                email: 'test@example.com',
                password: 'hashed_password',
                role: 'touriste'
            });

            await register(req, res);

            expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
            expect(User.create).toHaveBeenCalledWith({
                name: 'Test User',
                email: 'test@example.com',
                password: 'hashed_password',
                role: 'touriste'
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'Utilisateur créé' });
        });

        it('should create a new user with default role if role not provided', async () => {
            req.body = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
            };

            bcrypt.hash.mockResolvedValue('hashed_password');
            User.create.mockResolvedValue({
                id: 1,
                name: 'Test User',
                email: 'test@example.com',
                password: 'hashed_password',
                role: 'touriste'
            });

            await register(req, res);

            expect(User.create).toHaveBeenCalledWith({
                name: 'Test User',
                email: 'test@example.com',
                password: 'hashed_password',
                role: 'touriste'
            });
            expect(res.status).toHaveBeenCalledWith(201);
        });
    });

    describe('login', () => {
        it('should return token and user data for valid credentials', async () => {
            req.body = {
                email: 'test@example.com',
                password: 'password123'
            };

            const mockUser = {
                id: 1,
                email: 'test@example.com',
                password: 'hashed_password',
                name: 'Test User',
                role: 'touriste'
            };

            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('mock_token');

            await login(req, res);

            expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
            expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed_password');
            expect(jwt.sign).toHaveBeenCalledWith(
                { id: 1, role: 'touriste' },
                'test_secret',
                { expiresIn: '1d' }
            );
            expect(res.json).toHaveBeenCalledWith({
                token: 'mock_token',
                user: {
                    id: 1,
                    email: 'test@example.com',
                    name: 'Test User',
                    role: 'touriste'
                }
            });
        });

        it('should return 404 if user not found', async () => {
            req.body = {
                email: 'nonexistent@example.com',
                password: 'password123'
            };

            User.findOne.mockResolvedValue(null);

            await login(req, res);

            expect(User.findOne).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Utilisateur introuvable' });
        });

        it('should return 401 if password incorrect', async () => {
            req.body = {
                email: 'test@example.com',
                password: 'wrongpassword'
            };

            const mockUser = {
                id: 1,
                email: 'test@example.com',
                password: 'hashed_password',
            };

            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(false);

            await login(req, res);

            expect(bcrypt.compare).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'Mot de passe incorrect' });
        });
    });
});
