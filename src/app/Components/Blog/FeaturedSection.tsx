import Link from 'next/link'
import React from 'react'

function FeaturedSection() {
  return (
    <>
      <section className="blog-featured-section">
        <div className="blog-title">
          <h2>Featured Articles</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque impedit architecto cumque commodi labore dolorum esse incidunt deleniti error doloribus?</p>
        </div>

        {/* featured wrapper */}
        <div className="blog-featured-wrapper">
          
          {/* item */}
          <div className="blog-featured-item">
            <div className="blog-featured-content">
              <div className="blog-category">Medicine</div>
              <h2><Link href="/single"> 
                <span className='highlight'>Coronavirus Symptoms:</span> What Are They and Should I See a Doctor? 
              </Link></h2>
                <p>Prevention Sugar seems to have developed a reputation as the big bad wolf in relation to health.</p>
                <p>26, june, 2022</p>
            </div>
          </div>
          
          {/* item */}
          <div className="blog-featured-item">
            <div className="blog-featured-content">
              <h2><Link href="/single"> 
                <span className='highlight'>Coronavirus Symptoms:</span> What Are They and Should I See a Doctor? 
              </Link></h2>
                <p>Prevention Sugar seems to have developed a reputation as the big bad wolf in relation to health.</p>
                <p>26, june, 2022</p>
            </div>
          </div>
          
          {/* item */}
          <div className="blog-featured-item">
            <div className="blog-featured-content">
              <h2><Link href="/single"> 
                <span className='highlight'>Coronavirus Symptoms:</span> What Are They and Should I See a Doctor? 
              </Link></h2>
                <p>Prevention Sugar seems to have developed a reputation as the big bad wolf in relation to health.</p>
                <p>26, june, 2022</p>
            </div>
          </div>
          
          {/* item */}
          <div className="blog-featured-item">
            <div className="blog-featured-content">
              <h2><Link href="/single"> 
                <span className='highlight'>Coronavirus Symptoms:</span> What Are They and Should I See a Doctor? 
              </Link></h2>
                <p>Prevention Sugar seems to have developed a reputation as the big bad wolf in relation to health.</p>
                <p>26, june, 2022</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default FeaturedSection