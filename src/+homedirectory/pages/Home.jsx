import React from 'react'
import Categories from '../components/Categories'
import Hero from '../components/Hero'
import Header from '../layouts/Header'
import ChatbotApp from '../../chatbot/ChatbotApp'

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-white gradient-bg-artworks">
        <Header />
        <Hero />
        <Categories />
      </div>
    </div>
  )
}

export default Home