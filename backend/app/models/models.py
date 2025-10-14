from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, Table, Enum as SQLEnum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSON, ARRAY
from datetime import datetime
import enum

Base = declarative_base()

# Association tables for many-to-many relationships
animal_habitats = Table(
    'animal_habitats',
    Base.metadata,
    Column('animal_id', Integer, ForeignKey('animals.id')),
    Column('habitat_id', Integer, ForeignKey('habitats.id'))
)

animal_conservation_efforts = Table(
    'animal_conservation_efforts',
    Base.metadata,
    Column('animal_id', Integer, ForeignKey('animals.id')),
    Column('conservation_effort_id', Integer, ForeignKey('conservation_efforts.id'))
)

user_animal_discoveries = Table(
    'user_animal_discoveries',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('animal_id', Integer, ForeignKey('animals.id')),
    Column('discovered_at', DateTime, default=datetime.utcnow)
)

# Enums
class ConservationStatus(enum.Enum):
    LEAST_CONCERN = "Least Concern"
    NEAR_THREATENED = "Near Threatened"
    VULNERABLE = "Vulnerable"
    ENDANGERED = "Endangered"
    CRITICALLY_ENDANGERED = "Critically Endangered"
    EXTINCT_WILD = "Extinct in the Wild"
    EXTINCT = "Extinct"

class UserRole(enum.Enum):
    STUDENT = "student"
    TEACHER = "teacher"
    ADMIN = "admin"

class EcosystemRelationType(enum.Enum):
    PREDATOR_PREY = "predator_prey"
    COMPETITION = "competition"
    MUTUALISM = "mutualism"
    COMMENSALISM = "commensalism"
    PARASITISM = "parasitism"

# Core Models
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    role = Column(SQLEnum(UserRole), default=UserRole.STUDENT)
    school = Column(String, nullable=True)
    grade_level = Column(String, nullable=True)
    location = Column(String, nullable=True)  # For finding local organizations
    created_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    
    # Relationships
    discovered_animals = relationship("Animal", secondary=user_animal_discoveries, back_populates="discoverers")
    ecosystem_interactions = relationship("EcosystemInteraction", back_populates="created_by")
    conservation_actions = relationship("UserConservationAction", back_populates="user")

class Animal(Base):
    __tablename__ = "animals"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    scientific_name = Column(String, nullable=False)
    common_names = Column(ARRAY(String), default=[])
    classification = Column(JSON)  # {"kingdom": "Animalia", "phylum": "Chordata", etc.}
    conservation_status = Column(SQLEnum(ConservationStatus))
    
    # Basic info
    description = Column(Text)
    fun_facts = Column(ARRAY(String), default=[])
    diet = Column(String)  # carnivore, herbivore, omnivore
    lifespan = Column(String)
    size_info = Column(JSON)  # {"length": "1-2m", "weight": "50-100kg"}
    
    # Media
    image_urls = Column(ARRAY(String), default=[])
    video_urls = Column(ARRAY(String), default=[])
    audio_urls = Column(ARRAY(String), default=[])
    
    # External API data
    external_api_id = Column(String, nullable=True)  # For syncing with animal APIs
    last_updated = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    habitats = relationship("Habitat", secondary=animal_habitats, back_populates="animals")
    conservation_efforts = relationship("ConservationEffort", secondary=animal_conservation_efforts, back_populates="animals")
    discoverers = relationship("User", secondary=user_animal_discoveries, back_populates="discovered_animals")
    predator_relationships = relationship("EcosystemInteraction", foreign_keys="EcosystemInteraction.predator_id", back_populates="predator")
    prey_relationships = relationship("EcosystemInteraction", foreign_keys="EcosystemInteraction.prey_id", back_populates="prey")

class Habitat(Base):
    __tablename__ = "habitats"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    description = Column(Text)
    climate = Column(String)
    geography = Column(String)
    key_characteristics = Column(ARRAY(String), default=[])
    
    # Visualization data
    map_coordinates = Column(JSON)  # For showing on world map
    image_url = Column(String)
    
    # Relationships
    animals = relationship("Animal", secondary=animal_habitats, back_populates="habitats")

class EcosystemInteraction(Base):
    __tablename__ = "ecosystem_interactions"
    
    id = Column(Integer, primary_key=True, index=True)
    predator_id = Column(Integer, ForeignKey("animals.id"), nullable=True)
    prey_id = Column(Integer, ForeignKey("animals.id"), nullable=True)
    interaction_type = Column(SQLEnum(EcosystemRelationType), nullable=False)
    habitat_id = Column(Integer, ForeignKey("habitats.id"))
    description = Column(Text)
    strength = Column(Integer, default=1)  # 1-5 scale for interaction strength
    
    # Student-created interactions
    created_by_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    is_verified = Column(Boolean, default=False)  # Admin-verified interactions
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    predator = relationship("Animal", foreign_keys=[predator_id], back_populates="predator_relationships")
    prey = relationship("Animal", foreign_keys=[prey_id], back_populates="prey_relationships")
    habitat = relationship("Habitat")
    created_by = relationship("User", back_populates="ecosystem_interactions")

class ConservationEffort(Base):
    __tablename__ = "conservation_efforts"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    organization_name = Column(String)
    website_url = Column(String)
    location = Column(String)
    image_url = Column(String)
    
    # Problem and solutions
    conservation_problem = Column(Text)  # What threat is being addressed
    proposed_solutions = Column(JSON)  # Array of solution objects
    success_metrics = Column(JSON)  # How success is measured
    current_status = Column(String)
    
    # Action items
    petition_url = Column(String, nullable=True)
    volunteer_url = Column(String, nullable=True)
    donation_url = Column(String, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    
    # Relationships
    animals = relationship("Animal", secondary=animal_conservation_efforts, back_populates="conservation_efforts")
    user_actions = relationship("UserConservationAction", back_populates="conservation_effort")

class UserConservationAction(Base):
    __tablename__ = "user_conservation_actions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    conservation_effort_id = Column(Integer, ForeignKey("conservation_efforts.id"))
    action_type = Column(String)  # "petition_signed", "learned_about", "shared"
    completed_at = Column(DateTime, default=datetime.utcnow)
    notes = Column(Text, nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="conservation_actions")
    conservation_effort = relationship("ConservationEffort", back_populates="user_actions")

class UserProgress(Base):
    __tablename__ = "user_progress"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    # Discovery progress
    animals_discovered = Column(Integer, default=0)
    habitats_explored = Column(Integer, default=0)
    interactions_created = Column(Integer, default=0)
    conservation_actions_taken = Column(Integer, default=0)
    
    # NGSS standards progress
    ms_ls2_2_activities = Column(Integer, default=0)  # Ecosystem interactions
    ms_ls2_5_activities = Column(Integer, default=0)  # Conservation solutions
    
    # Badges earned
    badges_earned = Column(ARRAY(String), default=[])
    
    last_updated = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User")

# Quiz/Assessment Models (for educational features)
class Quiz(Base):
    __tablename__ = "quizzes"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    ngss_standard = Column(String)  # "MS-LS2-2", "MS-LS2-5", etc.
    difficulty_level = Column(String)  # "beginner", "intermediate", "advanced"
    questions = Column(JSON)  # Array of question objects
    created_by_id = Column(Integer, ForeignKey("users.id"))
    is_published = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class QuizAttempt(Base):
    __tablename__ = "quiz_attempts"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    quiz_id = Column(Integer, ForeignKey("quizzes.id"))
    score = Column(Integer)
    max_score = Column(Integer)
    answers = Column(JSON)  # User's answers
    completed_at = Column(DateTime, default=datetime.utcnow)
    time_taken = Column(Integer)  # in seconds