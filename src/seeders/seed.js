import sequelize from "../config/database.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Accommodation from "../models/Accommodation.js";
import Activity from "../models/Activity.js";
import Reservation from "../models/Reservation.js";
import Review from "../models/Review.js";
import "../models/index.js"; // Pour charger les associations

const seed = async () => {
    try {
        console.log("🌱 Connexion à la base de données...");
        await sequelize.authenticate();
        console.log("✅ Connexion réussie !");

        // Synchroniser les modèles (force: true pour réinitialiser les tables)
        console.log("🔄 Synchronisation des tables...");
        await sequelize.sync({ force: true });
        console.log("✅ Tables synchronisées !");

        // ========================================
        // 1. CRÉATION DES UTILISATEURS
        // ========================================
        console.log("👤 Création des utilisateurs...");
        const hashedPassword = await bcrypt.hash("password123", 10);

        const users = await User.bulkCreate([
            // Admin
            {
                email: "admin@asmoun-gadir.ma",
                password: hashedPassword,
                role: "admin",
            },
            // Organisateurs (propriétaires d'hébergements)
            {
                email: "hotel.atlas@gmail.com",
                password: hashedPassword,
                role: "organisateur",
            },
            {
                email: "riad.sahara@gmail.com",
                password: hashedPassword,
                role: "organisateur",
            },
            {
                email: "guesthouse.ocean@gmail.com",
                password: hashedPassword,
                role: "organisateur",
            },
            {
                email: "hostel.surf@gmail.com",
                password: hashedPassword,
                role: "organisateur",
            },
            // Touristes
            {
                email: "pierre.dupont@gmail.com",
                password: hashedPassword,
                role: "touriste",
            },
            {
                email: "marie.martin@yahoo.fr",
                password: hashedPassword,
                role: "touriste",
            },
            {
                email: "john.smith@outlook.com",
                password: hashedPassword,
                role: "touriste",
            },
            {
                email: "sarah.wilson@gmail.com",
                password: hashedPassword,
                role: "touriste",
            },
            {
                email: "ahmed.benali@gmail.com",
                password: hashedPassword,
                role: "touriste",
            },
        ]);
        console.log(`✅ ${users.length} utilisateurs créés !`);

        // ========================================
        // 2. CRÉATION DES HÉBERGEMENTS
        // ========================================
        console.log("🏨 Création des hébergements...");
        const accommodations = await Accommodation.bulkCreate([
            {
                name: "Hôtel Atlas Marina",
                type: "hotel",
                city: "Agadir",
                address: "Boulevard du 20 Août, Agadir Marina",
                description:
                    "Hôtel 5 étoiles avec vue panoramique sur l'océan Atlantique. Piscine, spa, et restaurant gastronomique.",
                licenseNumber: "HTL-AGD-2024-001",
                isVerified: true,
                userId: users[1].id, // hotel.atlas@gmail.com
            },
            {
                name: "Riad Sahara Perle",
                type: "riad",
                city: "Agadir",
                address: "Quartier Talborjt, Rue des Artisans",
                description:
                    "Riad traditionnel marocain avec patio intérieur, fontaine et terrasse avec vue sur la Kasbah.",
                licenseNumber: "RID-AGD-2024-002",
                isVerified: true,
                userId: users[2].id, // riad.sahara@gmail.com
            },
            {
                name: "Ocean Breeze Guesthouse",
                type: "guesthouse",
                city: "Taghazout",
                address: "Plage de Taghazout, Route Côtière",
                description:
                    "Maison d'hôtes familiale à 50m de la plage. Idéal pour les surfeurs et les amoureux de la nature.",
                licenseNumber: "GH-TGH-2024-003",
                isVerified: true,
                userId: users[3].id, // guesthouse.ocean@gmail.com
            },
            {
                name: "Surf Paradise Hostel",
                type: "hostel",
                city: "Taghazout",
                address: "Centre village Taghazout",
                description:
                    "Auberge de jeunesse moderne avec ambiance conviviale. Location de planches de surf disponible.",
                licenseNumber: "HST-TGH-2024-004",
                isVerified: false,
                userId: users[4].id, // hostel.surf@gmail.com
            },
        ]);
        console.log(`✅ ${accommodations.length} hébergements créés !`);

        // ========================================
        // 3. CRÉATION DES ACTIVITÉS
        // ========================================
        console.log("🎯 Création des activités...");
        const now = new Date();
        const activities = await Activity.bulkCreate([
            // Activités de l'Hôtel Atlas Marina
            {
                title: "Excursion en Quad dans le Désert",
                description:
                    "Découvrez les dunes dorées autour d'Agadir lors d'une aventure en quad de 3 heures. Guide expérimenté, thé à la menthe et snacks inclus.",
                category: "Aventure",
                dateStart: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // Dans 3 jours
                duration: 180, // 3 heures en minutes
                meetingPoint: "Lobby Hôtel Atlas Marina",
                totalPlaces: 12,
                availablePlaces: 12,
                price: 450.0,
                status: "published",
                accommodationId: accommodations[0].id,
            },
            {
                title: "Cours de Cuisine Marocaine",
                description:
                    "Apprenez à préparer un tajine authentique et des pâtisseries marocaines avec notre chef. Dégustation incluse.",
                category: "Gastronomie",
                dateStart: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000), // Dans 5 jours
                duration: 240, // 4 heures
                meetingPoint: "Restaurant de l'Hôtel Atlas Marina",
                totalPlaces: 8,
                availablePlaces: 8,
                price: 350.0,
                status: "published",
                accommodationId: accommodations[0].id,
            },
            // Activités du Riad Sahara Perle
            {
                title: "Visite Guidée de la Médina",
                description:
                    "Explorez les ruelles colorées de la médina d'Agadir reconstruite. Découvrez les souks, artisans et l'histoire de la ville.",
                category: "Culture",
                dateStart: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // Dans 2 jours
                duration: 150, // 2h30
                meetingPoint: "Entrée principale du Riad Sahara Perle",
                totalPlaces: 15,
                availablePlaces: 15,
                price: 180.0,
                status: "published",
                accommodationId: accommodations[1].id,
            },
            {
                title: "Atelier Calligraphie Arabe",
                description:
                    "Initiez-vous à l'art millénaire de la calligraphie arabe. Matériel fourni, repartez avec votre création.",
                category: "Art",
                dateStart: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // Dans 7 jours
                duration: 120, // 2 heures
                meetingPoint: "Salle de thé du Riad Sahara Perle",
                totalPlaces: 6,
                availablePlaces: 6,
                price: 250.0,
                status: "published",
                accommodationId: accommodations[1].id,
            },
            // Activités de Ocean Breeze Guesthouse
            {
                title: "Cours de Surf pour Débutants",
                description:
                    "Apprenez les bases du surf sur les vagues douces de Taghazout. Équipement complet fourni, moniteur certifié.",
                category: "Sport",
                dateStart: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000), // Demain
                duration: 120, // 2 heures
                meetingPoint: "Plage principale de Taghazout",
                totalPlaces: 8,
                availablePlaces: 8,
                price: 300.0,
                status: "published",
                accommodationId: accommodations[2].id,
            },
            {
                title: "Yoga au Lever du Soleil",
                description:
                    "Séance de yoga face à l'océan au lever du soleil. Tous niveaux bienvenus. Tapis fourni.",
                category: "Bien-être",
                dateStart: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000), // Demain
                duration: 75, // 1h15
                meetingPoint: "Terrasse Ocean Breeze Guesthouse",
                totalPlaces: 12,
                availablePlaces: 12,
                price: 100.0,
                status: "published",
                accommodationId: accommodations[2].id,
            },
            {
                title: "Randonnée Paradise Valley",
                description:
                    "Découvrez l'oasis cachée de Paradise Valley. Baignade dans les piscines naturelles, pique-nique inclus.",
                category: "Nature",
                dateStart: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000), // Dans 4 jours
                duration: 360, // 6 heures
                meetingPoint: "Parking Ocean Breeze Guesthouse",
                totalPlaces: 10,
                availablePlaces: 10,
                price: 400.0,
                status: "published",
                accommodationId: accommodations[2].id,
            },
            // Activités de Surf Paradise Hostel
            {
                title: "Surf Camp Intensif (3 jours)",
                description:
                    "Programme intensif de 3 jours pour progresser rapidement. 2 sessions par jour, analyse vidéo incluse.",
                category: "Sport",
                dateStart: new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000), // Dans 6 jours
                duration: 480, // 8 heures par jour
                meetingPoint: "Surf Paradise Hostel - Salle commune",
                totalPlaces: 6,
                availablePlaces: 6,
                price: 1200.0,
                status: "published",
                accommodationId: accommodations[3].id,
            },
            {
                title: "Barbecue & Musique sur la Plage",
                description:
                    "Soirée conviviale sur la plage avec barbecue de poisson frais et musique live. Ambiance garantie!",
                category: "Détente",
                dateStart: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // Dans 2 jours
                duration: 240, // 4 heures
                meetingPoint: "Devant Surf Paradise Hostel",
                totalPlaces: 30,
                availablePlaces: 30,
                price: 150.0,
                status: "published",
                accommodationId: accommodations[3].id,
            },
            // Activité complète (pour tester le statut 'full')
            {
                title: "Observation des Dauphins",
                description:
                    "Sortie en mer pour observer les dauphins dans leur habitat naturel. Petit-déjeuner à bord inclus.",
                category: "Nature",
                dateStart: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000), // Dans 10 jours
                duration: 180, // 3 heures
                meetingPoint: "Port d'Agadir Marina",
                totalPlaces: 10,
                availablePlaces: 0,
                price: 500.0,
                status: "full",
                accommodationId: accommodations[0].id,
            },
            // Activité brouillon (draft)
            {
                title: "Excursion au Parc Souss-Massa",
                description:
                    "Découvrez la réserve naturelle de Souss-Massa et ses oiseaux rares. En préparation.",
                category: "Nature",
                dateStart: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // Dans 14 jours
                duration: 300, // 5 heures
                meetingPoint: "À définir",
                totalPlaces: 15,
                availablePlaces: 15,
                price: 350.0,
                status: "draft",
                accommodationId: accommodations[0].id,
            },
        ]);
        console.log(`✅ ${activities.length} activités créées !`);

        // ========================================
        // 4. CRÉATION DES RÉSERVATIONS
        // ========================================
        console.log("📅 Création des réservations...");
        // Note: On désactive temporairement le hook afterCreate pour éviter les conflits
        const reservations = await Reservation.bulkCreate(
            [
                {
                    touristId: users[5].id, // pierre.dupont@gmail.com
                    activityId: activities[0].id, // Excursion en Quad
                    numberOfPlaces: 2,
                    totalPrice: 900.0,
                    status: "confirmed",
                },
                {
                    touristId: users[6].id, // marie.martin@yahoo.fr
                    activityId: activities[2].id, // Visite Médina
                    numberOfPlaces: 3,
                    totalPrice: 540.0,
                    status: "confirmed",
                },
                {
                    touristId: users[7].id, // john.smith@outlook.com
                    activityId: activities[4].id, // Cours de Surf
                    numberOfPlaces: 1,
                    totalPrice: 300.0,
                    status: "confirmed",
                },
                {
                    touristId: users[8].id, // sarah.wilson@gmail.com
                    activityId: activities[6].id, // Randonnée Paradise Valley
                    numberOfPlaces: 2,
                    totalPrice: 800.0,
                    status: "pending",
                },
                {
                    touristId: users[9].id, // ahmed.benali@gmail.com
                    activityId: activities[1].id, // Cours de Cuisine
                    numberOfPlaces: 4,
                    totalPrice: 1400.0,
                    status: "confirmed",
                },
                {
                    touristId: users[5].id, // pierre.dupont@gmail.com
                    activityId: activities[5].id, // Yoga au Lever du Soleil
                    numberOfPlaces: 2,
                    totalPrice: 200.0,
                    status: "confirmed",
                },
                {
                    touristId: users[6].id, // marie.martin@yahoo.fr
                    activityId: activities[8].id, // Barbecue & Musique
                    numberOfPlaces: 5,
                    totalPrice: 750.0,
                    status: "pending",
                },
                {
                    touristId: users[7].id, // john.smith@outlook.com
                    activityId: activities[7].id, // Surf Camp Intensif
                    numberOfPlaces: 1,
                    totalPrice: 1200.0,
                    status: "confirmed",
                },
                // Réservation annulée
                {
                    touristId: users[8].id, // sarah.wilson@gmail.com
                    activityId: activities[3].id, // Atelier Calligraphie
                    numberOfPlaces: 1,
                    totalPrice: 250.0,
                    status: "cancelled",
                },
            ],
            { hooks: false } // Désactiver les hooks pour le seeding
        );

        // Mettre à jour manuellement les places disponibles
        await Activity.update(
            { availablePlaces: 10 },
            { where: { id: activities[0].id } }
        ); // -2 places
        await Activity.update(
            { availablePlaces: 12 },
            { where: { id: activities[2].id } }
        ); // -3 places
        await Activity.update(
            { availablePlaces: 7 },
            { where: { id: activities[4].id } }
        ); // -1 place
        await Activity.update(
            { availablePlaces: 8 },
            { where: { id: activities[6].id } }
        ); // -2 places
        await Activity.update(
            { availablePlaces: 4 },
            { where: { id: activities[1].id } }
        ); // -4 places
        await Activity.update(
            { availablePlaces: 10 },
            { where: { id: activities[5].id } }
        ); // -2 places
        await Activity.update(
            { availablePlaces: 25 },
            { where: { id: activities[8].id } }
        ); // -5 places
        await Activity.update(
            { availablePlaces: 5 },
            { where: { id: activities[7].id } }
        ); // -1 place

        console.log(`✅ ${reservations.length} réservations créées !`);

        // ========================================
        // 5. CRÉATION DES AVIS
        // ========================================
        console.log("⭐ Création des avis...");
        const reviews = await Review.bulkCreate([
            {
                touristId: users[5].id, // pierre.dupont@gmail.com
                activityId: activities[0].id, // Excursion en Quad
                rating: 5,
                comment:
                    "Expérience incroyable ! Le guide était super sympa et les paysages à couper le souffle. Je recommande vivement !",
            },
            {
                touristId: users[6].id, // marie.martin@yahoo.fr
                activityId: activities[2].id, // Visite Médina
                rating: 4,
                comment:
                    "Très intéressant de découvrir l'histoire d'Agadir. Le guide parlait bien français. Un peu court à mon goût.",
            },
            {
                touristId: users[7].id, // john.smith@outlook.com
                activityId: activities[4].id, // Cours de Surf
                rating: 5,
                comment:
                    "Best surf lesson ever! The instructor was patient and I managed to stand up on my first day. Highly recommended!",
            },
            {
                touristId: users[9].id, // ahmed.benali@gmail.com
                activityId: activities[1].id, // Cours de Cuisine
                rating: 5,
                comment:
                    "Le tajine qu'on a préparé était délicieux ! Le chef nous a partagé plein de secrets de cuisine. Ambiance conviviale.",
            },
            {
                touristId: users[5].id, // pierre.dupont@gmail.com
                activityId: activities[5].id, // Yoga au Lever du Soleil
                rating: 4,
                comment:
                    "Moment magique face à l'océan. Le prof était attentif à tout le monde. Parfait pour bien commencer la journée.",
            },
            {
                touristId: users[7].id, // john.smith@outlook.com
                activityId: activities[7].id, // Surf Camp Intensif
                rating: 5,
                comment:
                    "Three amazing days! I improved so much. The video analysis was really helpful. Worth every dirham!",
            },
            {
                touristId: users[8].id, // sarah.wilson@gmail.com
                activityId: activities[0].id, // Excursion en Quad (un autre avis)
                rating: 3,
                comment:
                    "Fun activity but the quads were a bit old. The tea ceremony at the end was a nice touch though.",
            },
        ]);
        console.log(`✅ ${reviews.length} avis créés !`);

        // ========================================
        // RÉSUMÉ
        // ========================================
        console.log("\n" + "=".repeat(50));
        console.log("🎉 SEEDING TERMINÉ AVEC SUCCÈS !");
        console.log("=".repeat(50));
        console.log(`📊 Résumé des données créées:`);
        console.log(`   👤 Utilisateurs: ${users.length}`);
        console.log(`      - 1 Admin`);
        console.log(`      - 4 Organisateurs`);
        console.log(`      - 5 Touristes`);
        console.log(`   🏨 Hébergements: ${accommodations.length}`);
        console.log(`   🎯 Activités: ${activities.length}`);
        console.log(`   📅 Réservations: ${reservations.length}`);
        console.log(`   ⭐ Avis: ${reviews.length}`);
        console.log("=".repeat(50));
        console.log("\n📧 Comptes de test (mot de passe: password123):");
        console.log("   Admin: admin@asmoun-gadir.ma");
        console.log("   Organisateur: hotel.atlas@gmail.com");
        console.log("   Touriste: pierre.dupont@gmail.com");
        console.log("=".repeat(50) + "\n");

        process.exit(0);
    } catch (error) {
        console.error("❌ Erreur lors du seeding:", error);
        process.exit(1);
    }
};

seed();
