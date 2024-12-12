import React from 'react'
import styles from './HomeStats.module.css';
function HomeStats() {
  return (
    <div className={styles.homestats}> 
       <span>
            <h1>546+</h1>
            <h3>Registered Riders</h3>
        </span> 
        <p>|</p>
       <span>
            <h1>789,900+</h1>
         <h3>   Orders Delivered</h3>
            
        </span> 
        <p>|</p>
       <span>
            <h1>690+  </h1>
            <h3> Restaurants Partnered</h3>
        </span> 
        <p>|</p>

       <span>
            <h1>17,457+</h1>
            <h3>Food items+</h3>
        </span> 
         
    </div>
  )
}

export default HomeStats
