# 🐾 AnimalDex

An interactive educational platform that helps students explore animal facts, understand ecosystem relationships, and take meaningful conservation action while meeting NGSS standards.

![AnimalDex Demo](https://via.placeholder.com/800x400/2563eb/ffffff?text=AnimalDex+Demo+Coming+Soon)

## 🌟 Features

### 🔍 Animal Discovery
- **Comprehensive animal database** with rich media (photos, videos, audio)
- **Smart search and filtering** by habitat, conservation status, and classification
- **Daily animal discovery** with random fact generator
- **User progress tracking** with achievement badges

### 🌍 Ecosystem Explorer (NGSS MS-LS2-2)
- **Interactive habitat mapping** showing global ecosystems
- **Drag-and-drop relationship builder** for predator-prey, competition, and mutualism
- **Food web constructor** enabling students to predict interaction patterns
- **Cross-ecosystem comparisons** demonstrating species adaptation

### 🦎 Conservation Action Center (NGSS MS-LS2-5)
- **Real conservation case studies** with multiple solution approaches
- **Solution comparison tools** for evaluating biodiversity strategies
- **Local wildlife organization finder** based on user location
- **Curated petition integration** connecting learning to real-world action

### 📚 Educational Integration
- **Teacher dashboard** for assignment creation and progress monitoring
- **NGSS standards alignment** with clear learning objective mapping
- **Student collaboration tools** for sharing discoveries and solutions
- **Assessment and quiz system** with instant feedback

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** with TypeScript and App Router
- **Tailwind CSS** + **Shadcn UI** for modern, accessible design
- **TanStack Query** for efficient API state management
- **Leaflet** for interactive ecosystem mapping

### Backend
- **FastAPI** with Python for high-performance APIs
- **PostgreSQL** with SQLAlchemy ORM for robust data management
- **Pydantic** for data validation and serialization

### Infrastructure
- **Vercel** for frontend deployment and serverless functions
- **Railway** for PostgreSQL database hosting
- **AWS S3** for media storage and CDN

### External Integrations
- **Animal API / iNaturalist** for comprehensive species data
- **Conservation organization APIs** for real-time action opportunities
- **Geolocation services** for local wildlife organization discovery

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nbtrieu/animaldex.git
   cd animaldex
   ```

2. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Set up the backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

4. **Configure environment variables**
   ```bash
   # Frontend (.env.local)
   NEXT_PUBLIC_API_URL=http://localhost:8000
   
   # Backend (.env)
   DATABASE_URL=postgresql://user:password@host:port/dbname
   SECRET_KEY=your_secret_key
   ```

## 📱 Screenshots

| Animal Discovery | Ecosystem Builder | Conservation Center |
|-----------------|------------------|-------------------|
| ![Animal Discovery](https://via.placeholder.com/250x150/059669/ffffff?text=Animal+Facts) | ![Ecosystem Builder](https://via.placeholder.com/250x150/dc2626/ffffff?text=Food+Web) | ![Conservation](https://via.placeholder.com/250x150/7c3aed/ffffff?text=Take+Action) |

## 🎯 Educational Standards

AnimalDex aligns with Next Generation Science Standards (NGSS):

- **MS-LS2-2**: Construct explanations predicting patterns of interactions among organisms across multiple ecosystems
- **MS-LS2-5**: Evaluate competing design solutions for maintaining biodiversity and ecosystem services

## 🗺️ Project Roadmap

### Phase 1 (MVP) - ✅ In Progress
- [x] Project setup and database design
- [x] Basic animal discovery API
- [ ] Animal facts frontend interface
- [ ] User authentication system
- [ ] Basic ecosystem visualization

### Phase 2 (Core Features)
- [ ] Ecosystem interaction builder
- [ ] Conservation case study database
- [ ] Teacher dashboard and assignments
- [ ] Student progress tracking

### Phase 3 (Enhanced Features)
- [ ] Real-time collaboration tools
- [ ] Mobile app considerations
- [ ] Advanced data analytics
- [ ] Expanded NGSS standard coverage

## 🤝 Contributing

This is primarily a portfolio project, but suggestions and feedback are welcome! Please feel free to:

1. Open an issue for bug reports or feature suggestions
2. Fork the repository for your own educational experiments
3. Share with educators who might benefit from the platform

## 👩‍💻 About the Developer

Built by [Nicole Nghi Trieu](https://ntothepoweroftrieu.vercel.app/), a Full Stack Developer with a background in Science Education. This project combines technical skills with educational expertise to create meaningful learning experiences.

**Connect with me:**
- 🌐 [Portfolio](https://ntothepoweroftrieu.vercel.app/)
- 💼 [LinkedIn](https://linkedin.com/in/nicole-nghi-trieu)
- 🐙 [GitHub](https://github.com/nbtrieu)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NGSS Framework** for providing clear learning standards
- **iNaturalist & Wildlife Organizations** for conservation data and inspiration
- **Open Source Community** for the amazing tools that make this possible

---

**⭐ Star this repository if you find it helpful for education or web development!**

*Last updated: September 2025*
