import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import "../styles/global.css"

const WeddingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [guestbook, setGuestbook] = useState([])
  const [formData, setFormData] = useState({ name: '', message: '' })

  // Mock gallery images
  const galleryImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=600&fit=crop', alt: 'Couple photo 1' },
    { id: 2, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop', alt: 'Couple photo 2' },
    { id: 3, src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=600&fit=crop', alt: 'Couple photo 3' },
    { id: 4, src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=600&fit=crop', alt: 'Couple photo 4' },
    { id: 5, src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&h=600&fit=crop', alt: 'Couple photo 5' },
    { id: 6, src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=600&fit=crop', alt: 'Couple photo 6' }
  ]

  const openModal = (image) => {
    setSelectedImage(image)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.message) {
      setGuestbook([...guestbook, { ...formData, id: Date.now() }])
      setFormData({ name: '', message: '' })
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Save the date function
  const saveTheDate = () => {
    const eventDetails = `Sarah & Michael Wedding
Date: June 15, 2024
Time: 4:00 PM
Location: Rose Garden Chapel, San Francisco`

    if (navigator.share) {
      navigator.share({
        title: 'Sarah & Michael Wedding',
        text: eventDetails,
      })
    } else {
      navigator.clipboard.writeText(eventDetails)
      alert('Wedding details copied to clipboard!')
    }
  }

  return (
    <>
      <Helmet>
        <title>Sarah & Michael Wedding</title>
        <meta name="description" content="Join us for our special day - June 15, 2024" />
      </Helmet>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Sarah & Michael</h1>
          <p className="hero-subtitle">are getting married</p>
          <div className="hero-date">June 15, 2024</div>
          <button className="cta-button" onClick={saveTheDate}>
            Save the Date
          </button>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1000&fit=crop" alt="Hero couple" />
        </div>
      </section>

      {/* Couple Section */}
      <section className="couple-section">
        <div className="container">
          <h2 className="section-title">Our Story</h2>
          <div className="couple-content">
            <div className="couple-card">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face" alt="Sarah" className="couple-photo" />
              <h3>Sarah Johnson</h3>
              <p>A passionate photographer who loves capturing life's beautiful moments. Sarah enjoys hiking, reading, and trying new coffee shops around the city.</p>
            </div>
            <div className="love-story">
              <h3>How We Met</h3>
              <p>We first crossed paths at a mutual friend's art gallery opening in 2019. Michael was admiring a landscape photograph that Sarah had taken. Little did he know, she was standing right behind him! After a conversation that lasted until closing time, we knew we had found something special.</p>
            </div>
            <div className="couple-card">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face" alt="Michael" className="couple-photo" />
              <h3>Michael Chen</h3>
              <p>A software engineer with a love for cooking and outdoor adventures. Michael enjoys rock climbing, playing guitar, and exploring new hiking trails.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <h2 className="section-title">Our Journey Together</h2>
          <div className="gallery-grid">
            {galleryImages.map((image) => (
              <div key={image.id} className="gallery-item" onClick={() => openModal(image)}>
                <img src={image.src} alt={image.alt} />
                <div className="gallery-overlay">
                  <span>View</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <img src={selectedImage.src} alt={selectedImage.alt} />
          </div>
        </div>
      )}

      {/* Event Details Section */}
      <section className="event-section">
        <div className="container">
          <h2 className="section-title">Wedding Details</h2>
          <div className="event-cards">
            <div className="event-card">
              <div className="event-icon">💒</div>
              <h3>Ceremony</h3>
              <p><strong>Time:</strong> 4:00 PM</p>
              <p><strong>Date:</strong> June 15, 2024</p>
              <p><strong>Location:</strong> Rose Garden Chapel<br />123 Garden Lane, San Francisco, CA</p>
              <p>Join us as we exchange vows in the beautiful Rose Garden Chapel surrounded by blooming flowers and natural beauty.</p>
            </div>
            <div className="event-card">
              <div className="event-icon">🎉</div>
              <h3>Reception</h3>
              <p><strong>Time:</strong> 6:00 PM</p>
              <p><strong>Date:</strong> June 15, 2024</p>
              <p><strong>Location:</strong> Grand Ballroom<br />456 Celebration Ave, San Francisco, CA</p>
              <p>Let's celebrate with dinner, dancing, and memories that will last a lifetime. Cocktail hour begins at 6:00 PM.</p>
            </div>
          </div>
          <div className="dress-code">
            <h4>Dress Code</h4>
            <p>Semi-formal attire requested. Think garden party elegance!</p>
          </div>
        </div>
      </section>

      {/* Guestbook Form */}
      <section className="guestbook-section">
        <div className="container">
          <h2 className="section-title">Leave us a message</h2>
          <form onSubmit={handleSubmit} className="guestbook-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your message to the happy couple..."
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>

          {/* Display Guestbook Messages */}
          {guestbook.length > 0 && (
            <div className="guestbook-messages">
              <h3>Messages from our loved ones</h3>
              {guestbook.map((entry) => (
                <div key={entry.id} className="guestbook-entry">
                  <h4>{entry.name}</h4>
                  <p>{entry.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <h3>Sarah & Michael</h3>
            <p>June 15, 2024 • San Francisco, CA</p>
            <div className="footer-links">
              <button onClick={saveTheDate} className="footer-button">Save the Date</button>
              <a href="mailto:wedding@sarahandmichael.com" className="footer-button">Contact Us</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Sarah & Michael Wedding. Made with love.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default WeddingPage