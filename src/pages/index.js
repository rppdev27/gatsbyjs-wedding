// src/pages/index.js
import React, { useState } from "react"
import { Helmet } from "react-helmet"
import "../styles/global.css"

const WeddingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [formStatus, setFormStatus] = useState(null) // 'submitting', 'success', 'error'

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

  // Handle Netlify form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('submitting')

    const form = e.target
    const formData = new FormData(form)

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      })

      if (response.ok) {
        setFormStatus('success')
        form.reset() // Clear the form
        // Auto-hide success message after 5 seconds
        setTimeout(() => setFormStatus(null), 5000)
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setFormStatus('error')
      // Auto-hide error message after 5 seconds
      setTimeout(() => setFormStatus(null), 5000)
    }
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

      {/* Guestbook Form with Netlify Forms */}
      <section className="guestbook-section">
        <div className="container">
          <h2 className="section-title">Leave us a message</h2>
          
          {/* Status Messages */}
          {formStatus === 'success' && (
            <div className="form-message success">
              <p>✅ Thank you! Your message has been sent successfully.</p>
            </div>
          )}
          
          {formStatus === 'error' && (
            <div className="form-message error">
              <p>❌ Sorry, there was an error sending your message. Please try again.</p>
            </div>
          )}

          <form 
            onSubmit={handleSubmit} 
            className="guestbook-form"
            name="wedding-guestbook"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            {/* Hidden fields for Netlify */}
            <input type="hidden" name="form-name" value="wedding-guestbook" />
            {/* Honeypot field for spam prevention */}
            <div style={{ display: 'none' }}>
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </div>

            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                disabled={formStatus === 'submitting'}
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email (optional)"
                disabled={formStatus === 'submitting'}
              />
            </div>
            
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your message to the happy couple..."
                rows="4"
                required
                disabled={formStatus === 'submitting'}
              />
            </div>
            
            <button 
              type="submit" 
              className={`submit-button ${formStatus === 'submitting' ? 'submitting' : ''}`}
              disabled={formStatus === 'submitting'}
            >
              {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {/* Sample messages to show what it looks like */}
          <div className="guestbook-messages">
            <h3>Messages from our loved ones</h3>
            <div className="guestbook-entry">
              <h4>Emma & James</h4>
              <p>So excited to celebrate with you both! Can't wait to see you tie the knot. Love you guys! ❤️</p>
            </div>
            <div className="guestbook-entry">
              <h4>Mom & Dad</h4>
              <p>We are so proud of you both and can't wait to welcome Michael to the family officially. This is going to be the most beautiful celebration!</p>
            </div>
          </div>
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