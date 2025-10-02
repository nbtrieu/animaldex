from app.database import SessionLocal, engine
from app.models.models import Animal, Habitat, ConservationEffort, ConservationStatus, Base
from datetime import datetime

def create_tables():
    """Create all tables"""
    Base.metadata.create_all(bind=engine)
    print("✅ Tables created")

def seed_habitats(db):
    """Seed habitat data"""
    habitats_data = [
        {
            "name": "Arctic Tundra",
            "description": "Cold, treeless region with permafrost",
            "climate": "Polar",
            "geography": "Northern hemisphere, high latitudes",
            "key_characteristics": ["Permafrost", "Short growing season", "Low biodiversity"]
        },
        {
            "name": "Tropical Rainforest",
            "description": "Dense, warm forests with high rainfall",
            "climate": "Tropical",
            "geography": "Near equator",
            "key_characteristics": ["High biodiversity", "Year-round warmth", "Heavy rainfall"]
        },
        {
            "name": "Coral Reef",
            "description": "Underwater ecosystems built by coral colonies",
            "climate": "Tropical marine",
            "geography": "Shallow, warm ocean waters",
            "key_characteristics": ["High biodiversity", "Symbiotic relationships", "Calcium carbonate structures"]
        },
        {
            "name": "Temperate Forest",
            "description": "Forests with distinct seasons",
            "climate": "Temperate",
            "geography": "Mid-latitudes",
            "key_characteristics": ["Deciduous trees", "Four seasons", "Moderate rainfall"]
        },
        {
            "name": "Savanna",
            "description": "Grasslands with scattered trees",
            "climate": "Tropical",
            "geography": "Africa, South America, Australia",
            "key_characteristics": ["Seasonal rainfall", "Grazing animals", "Fire-adapted plants"]
        }
    ]
    
    for habitat_data in habitats_data:
        habitat = Habitat(**habitat_data)
        db.add(habitat)
    
    db.commit()
    print(f"✅ Seeded {len(habitats_data)} habitats")

def seed_animals(db):
    """Seed animal data with diverse species"""
    animals_data = [
        {
            "name": "Arctic Fox",
            "scientific_name": "Vulpes lagopus",
            "common_names": ["Arctic Fox", "White Fox", "Polar Fox"],
            "conservation_status": ConservationStatus.LEAST_CONCERN,
            "description": "A small fox native to Arctic regions, known for its thick warm fur and ability to survive extreme cold.",
            "fun_facts": [
                "Arctic foxes change coat color seasonally - white in winter, brown in summer",
                "They have the warmest fur of any mammal, able to survive -70°C",
                "Can hear prey moving under snow from several meters away",
                "Have furry feet that act like snowshoes"
            ],
            "diet": "Omnivore",
            "lifespan": "3-6 years in wild, up to 14 in captivity",
            "image_urls": ["https://images.unsplash.com/photo-1470093851219-69951fcbb533", "https://images.unsplash.com/photo-1712322424999-96d2f4d84df0"]
        },
        {
            "name": "Clownfish",
            "scientific_name": "Amphiprioninae",
            "common_names": ["Clownfish", "Anemonefish"],
            "conservation_status": ConservationStatus.LEAST_CONCERN,
            "description": "Small, colorful fish that live among sea anemones in coral reefs.",
            "fun_facts": [
                "All clownfish are born male and can change to female",
                "They have immunity to sea anemone stings",
                "Live in a symbiotic relationship with sea anemones",
                "Made famous by the movie 'Finding Nemo'"
            ],
            "diet": "Omnivore",
            "lifespan": "6-10 years",
            "image_urls": ["https://images.unsplash.com/photo-1535591273668-578e31182c4f", "https://images.unsplash.com/photo-1536168032936-9ce3b4b3165c"]
        },
        {
            "name": "African Elephant",
            "scientific_name": "Loxodonta africana",
            "common_names": ["African Elephant", "African Bush Elephant"],
            "conservation_status": ConservationStatus.ENDANGERED,
            "description": "The largest land animal on Earth, known for its intelligence and strong family bonds.",
            "fun_facts": [
                "Can communicate using infrasound below human hearing range",
                "Have excellent memory and can recognize individuals after years",
                "Use their trunks as tools with over 40,000 muscles",
                "Play crucial role in ecosystem as 'ecosystem engineers'"
            ],
            "diet": "Herbivore",
            "lifespan": "60-70 years",
            "image_urls": ["https://images.unsplash.com/photo-1564760055775-d63b17a55c44", "https://images.unsplash.com/photo-1534996367885-1c10e3e890be"]
        },
        {
            "name": "Gray Wolf",
            "scientific_name": "Canis lupus",
            "common_names": ["Gray Wolf", "Timber Wolf"],
            "conservation_status": ConservationStatus.LEAST_CONCERN,
            "description": "A large canine native to wilderness areas, known for pack behavior and ecological importance.",
            "fun_facts": [
                "Live and hunt in packs with complex social structures",
                "Can travel up to 30 miles in a day",
                "Reintroduction to Yellowstone restored ecosystem balance",
                "Communicate through howling, body language, and scent marking"
            ],
            "diet": "Carnivore",
            "lifespan": "6-8 years in wild, 13-16 in captivity",
            "image_urls": ["https://images.unsplash.com/photo-1546638285-f17602bf4bdc", "https://images.unsplash.com/photo-1515253475595-2aa42d668c8c"]
        },
        {
            "name": "Giant Panda",
            "scientific_name": "Ailuropoda melanoleuca",
            "common_names": ["Giant Panda", "Panda Bear"],
            "conservation_status": ConservationStatus.VULNERABLE,
            "description": "A bear species native to China, known for its distinctive black and white coloring.",
            "fun_facts": [
                "Spend 12-14 hours a day eating bamboo",
                "Have a 'pseudo-thumb' for grasping bamboo",
                "Conservation success story - moved from Endangered to Vulnerable",
                "Newborn pandas are about the size of a stick of butter"
            ],
            "diet": "Herbivore (99% bamboo)",
            "lifespan": "20 years in wild, 30 in captivity",
            "image_urls": ["https://images.unsplash.com/photo-1564349683136-77e08dba1ef7", "https://images.unsplash.com/photo-1709128521516-1d43665e94a6"]
        },
        {
            "name": "Sea Turtle",
            "scientific_name": "Chelonioidea",
            "common_names": ["Sea Turtle", "Marine Turtle"],
            "conservation_status": ConservationStatus.ENDANGERED,
            "description": "Ancient marine reptiles that have existed for over 100 million years.",
            "fun_facts": [
                "Can hold their breath for 4-7 hours when resting",
                "Navigate using Earth's magnetic field",
                "Temperature of sand determines hatchling gender",
                "Some species travel over 10,000 miles annually"
            ],
            "diet": "Omnivore (varies by species)",
            "lifespan": "50-100 years",
            "image_urls": ["https://images.unsplash.com/photo-1581242163695-19d0acfd486f", "https://images.unsplash.com/photo-1573878125221-fbace3474fb2"]
        },
        {
            "name": "Honeybee",
            "scientific_name": "Apis mellifera",
            "common_names": ["Honeybee", "Western Honeybee"],
            "conservation_status": ConservationStatus.VULNERABLE,
            "description": "Essential pollinators that produce honey and live in highly organized colonies.",
            "fun_facts": [
                "A colony can have 60,000 bees in summer",
                "Communicate through 'waggle dance' to share food locations",
                "Pollinate about one-third of crops humans eat",
                "Must visit 2 million flowers to make 1 pound of honey"
            ],
            "diet": "Herbivore (nectar and pollen)",
            "lifespan": "Worker: 6 weeks, Queen: 2-5 years",
            "image_urls": ["https://images.unsplash.com/photo-1645370982616-9312cc07a8a1", "https://images.unsplash.com/photo-1627515795375-8a6010609c53"]
        },
        {
            "name": "Monarch Butterfly",
            "scientific_name": "Danaus plexippus",
            "common_names": ["Monarch", "Monarch Butterfly"],
            "conservation_status": ConservationStatus.ENDANGERED,
            "description": "A milkweed butterfly known for its incredible multi-generational migration.",
            "fun_facts": [
                "Migrate up to 3,000 miles from Canada to Mexico",
                "Take 4-5 generations to complete full migration cycle",
                "Toxic to predators due to milkweed diet",
                "Can't survive freezing temperatures"
            ],
            "diet": "Herbivore (milkweed as caterpillar, nectar as adult)",
            "lifespan": "2-6 weeks (except migration generation: 8-9 months)",
            "image_urls": ["https://images.unsplash.com/photo-1676261122648-a3b853d867ba", "https://images.unsplash.com/photo-1509715513011-e394f0cb20c4"]
        },
        {
            "name": "Polar Bear",
            "scientific_name": "Ursus maritimus",
            "common_names": ["Polar Bear", "Ice Bear"],
            "conservation_status": ConservationStatus.VULNERABLE,
            "description": "The largest land carnivore, adapted to life in the Arctic.",
            "fun_facts": [
                "Can swim continuously for days covering hundreds of miles",
                "Fur appears white but is actually transparent",
                "Black skin underneath helps absorb heat",
                "Climate change threatens their sea ice habitat"
            ],
            "diet": "Carnivore (primarily seals)",
            "lifespan": "25-30 years",
            "image_urls": ["https://images.unsplash.com/photo-1610748402795-859b3099fe39", "https://images.unsplash.com/photo-1646365532028-2c47743d3ad3"]
        },
        {
            "name": "Coral Polyp",
            "scientific_name": "Anthozoa",
            "common_names": ["Coral", "Coral Polyp"],
            "conservation_status": ConservationStatus.CRITICALLY_ENDANGERED,
            "description": "Tiny animals that build coral reefs through calcium carbonate structures.",
            "fun_facts": [
                "Coral reefs support 25% of marine life despite covering <1% of ocean",
                "Polyps have symbiotic algae that provide them food through photosynthesis",
                "Can live for hundreds to thousands of years",
                "Bleaching occurs when stressed corals expel their algae"
            ],
            "diet": "Carnivore (plankton) + photosynthesis from algae",
            "lifespan": "Hundreds to thousands of years (colony)",
            "image_urls": ["https://images.unsplash.com/photo-1582967788606-a171c1080cb0", "https://images.unsplash.com/photo-1621775595317-4de3a6646c6c"]
        }
    ]
    
    for animal_data in animals_data:
        animal = Animal(**animal_data)
        db.add(animal)
    
    db.commit()
    print(f"✅ Seeded {len(animals_data)} animals")

def seed_conservation_efforts(db):
    """Seed conservation effort data"""
    efforts_data = [
        {
            "title": "Great Barrier Reef Restoration",
            "description": "Coral farming and transplantation to restore damaged reef areas",
            "organization_name": "Australian Institute of Marine Science",
            "website_url": "https://www.aims.gov.au",
            "location": "Australia",
            "conservation_problem": "Rising ocean temperatures causing mass coral bleaching events",
            "current_status": "Active",
            "petition_url": "https://www.change.org/reef-protection",
            "is_active": True
        },
        {
            "title": "Yellowstone Wolf Reintroduction",
            "description": "Successful reintroduction of gray wolves to restore ecosystem balance",
            "organization_name": "Yellowstone Wolf Project",
            "website_url": "https://www.nps.gov/yell/learn/nature/wolf-restoration.htm",
            "location": "Yellowstone National Park, USA",
            "conservation_problem": "Loss of apex predator led to ecosystem imbalance and overgrazing",
            "current_status": "Success - Completed",
            "is_active": True
        }
    ]
    
    for effort_data in efforts_data:
        effort = ConservationEffort(**effort_data)
        db.add(effort)
    
    db.commit()
    print(f"✅ Seeded {len(efforts_data)} conservation efforts")

def seed_database():
    """Main seeding function"""
    print("🌱 Starting database seeding...")
    
    create_tables()
    
    db = SessionLocal()
    
    try:
        # Check if already seeded
        existing_animals = db.query(Animal).count()
        if existing_animals > 0:
            print(f"⚠️  Database already has {existing_animals} animals. Skipping seed.")
            return
        
        seed_habitats(db)
        seed_animals(db)
        seed_conservation_efforts(db)
        
        print("✅ Database seeding completed successfully!")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()