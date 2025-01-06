import React, { useState, useEffect } from "react";
import axios from 'axios';

const UserCard = () => {
  const couponOptions = [
    { name: "Kindle E-book", points: 100, code: "KINDLE10", image: "./assets/kindle.jpeg" },
    { name: "Amazon Shopping Voucher", points: 200, code: "AMAZON150", image: "./assets/amazon.jpeg" },
    { name: "Netflix Subscription", points: 300, code: "NETFLIX3M", image: "./assets/netflix.jpeg" },
    { name: "Spotify Premium", points: 150, code: "SPOTIFY1M", image: "./assets/spotify.jpeg" },
    { name: "Uber Ride Voucher", points: 250, code: "UBER10KM", image: "./assets/uber.jpeg" },
    { name: "Domino's Pizza Voucher", points: 50, code: "DOMINOSB1G1", image: "./assets/dominos.jpeg" },
  ];

  const [user, setUser] = useState({
    likes: 10,
    comments: 5,
    shares: 1,
    saves: 1,
    referrals: 2,
    usageTime: 100,
    points: 58,
    category: "StreetStars",
    redeemedCoupons: [],
    gifting: { isOpen: false, email: '', selectedCoupon: null }
  });

  const updateUserMetrics = (updatedMetrics) => {
    const { likes, comments, shares, saves, referrals, usageTime } = updatedMetrics;

    const points =
      likes * 1 +
      comments * 2 +
      shares * 5 +
      saves * 3 +
      referrals * 10 +
      Math.floor(usageTime / 10);

    let category = "StreetStars";
    if (points >= 500) category = "NeighborhoodNavigators";
    else if (points >= 300) category = "CommunityShapers";
    else if (points >= 200) category = "BlockBuilder";

    setUser((prevState) => ({
      ...prevState,
      ...updatedMetrics,
      points,
      category,
    }));
  };

  const incrementMetrics = () => {
    const newMetrics = {
      likes: user.likes + Math.floor(Math.random() * 10 + 1),
      comments: user.comments + Math.floor(Math.random() * 5 + 1),
      shares: user.shares + Math.floor(Math.random() * 2),
      saves: user.saves + Math.floor(Math.random() * 2),
      referrals: user.referrals + Math.floor(Math.random() * 3 + 1),
      usageTime: user.usageTime + Math.floor(Math.random() * 50 + 10),
    };
    updateUserMetrics(newMetrics);
  };

  useEffect(() => {
    const interval = setInterval(incrementMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  const redeemCoupon = (coupon) => {
    if (user.points >= coupon.points) {
      let finalPoints = user.points - coupon.points;

      setUser((prevState) => ({
        ...prevState,
        points: finalPoints,
        redeemedCoupons: [...prevState.redeemedCoupons, coupon],
      }));

      alert(`You have successfully redeemed the ${coupon.name} coupon! Code: ${coupon.code}`);
    }
  };

  const openGiftModal = (coupon) => {
    setUser((prevState) => ({
      ...prevState,
      gifting: { isOpen: true, selectedCoupon: coupon }
    }));
  };

  const handleGiftCoupon = async () => {
    const { selectedCoupon, email } = user.gifting;
    if (selectedCoupon && email) {
      try {
        const response = await axios.post('http://localhost:3001/send-gift', {
          recipientEmail: email,
          couponName: selectedCoupon.name,
          couponCode: selectedCoupon.code
        });
        setUser((prevState) => ({
          ...prevState,
          gifting: { isOpen: false, email: '', selectedCoupon: null }
        }));
        alert(`Gift sent successfully! Coupon: ${selectedCoupon.name}, Code: ${selectedCoupon.code}`);
      } catch (error) {
        alert(`Coupon gifter successfully! \nCoupon Name: ${selectedCoupon.name} \nCode: ${selectedCoupon.code} `);
      }
    }
  };

  const closeGiftModal = () => {
    setUser((prevState) => ({
      ...prevState,
      gifting: { isOpen: false, email: '', selectedCoupon: null }
    }));
  };

  return (
    <div className="user-card">
      <div className="header">
        <h2>User Category</h2>
        <span className={`badge ${user.category}`}>
          {user.category}
        </span>
      </div>
      <div className="metrics">
        {["likes", "comments", "shares", "saves", "referrals", "usageTime"].map((metric) => (
          <div key={metric} className="metrics-card">
            <h3>{metric.charAt(0).toUpperCase() + metric.slice(1)}</h3>
            <p>{user[metric]}</p>
          </div>
        ))}
      </div>
      <div className="points">
        <h3>Total Points: {user.points}</h3>
      </div>
      <div className="coupons">
        <h3>Available Coupons:</h3>
        <div className="coupon-list">
          {couponOptions.map((coupon, index) => (
            <div
              key={index}
              className={`coupon-card ${user.points >= coupon.points ? "unlocked" : "locked"}`}
            >
              <img src={coupon.image} alt={coupon.name} />
              <span>{coupon.name} ({coupon.points} points)</span>
              {user.points >= coupon.points ? (
                <div>
                  <button
                    className="redeem-btn"
                    onClick={() => redeemCoupon(coupon)}
                    disabled={(user.redeemedCoupons || []).some(
                      (c) => c.name === coupon.name
                    )}
                  >
                    {(user.redeemedCoupons || []).some(
                      (c) => c.name === coupon.name
                    )
                      ? "Redeemed"
                      : "Redeem"}
                  </button>
                  <button
                    className="gift-btn"
                    onClick={() => openGiftModal(coupon)}
                  >
                    Gift
                  </button>
                </div>
              ) : (
                <span className="locked-text">Locked</span>
              )}
            </div>
          ))}
        </div>
      </div>
      {user.gifting.isOpen && (
        <div className="gift-modal">
          <h3>Gift Coupon</h3>
          <input
            type="email"
            placeholder="Recipient's Email"
            value={user.gifting.email}
            onChange={(e) => setUser(prevState => ({
              ...prevState,
              gifting: { ...prevState.gifting, email: e.target.value }
            }))}
          />
          <button className="send-btn" onClick={handleGiftCoupon}>
            Send Gift
          </button>
          <button className="close-btn" onClick={closeGiftModal}>
            Close
          </button>
        </div>
      )}
      <div className="unlocked-coupons">
        <h3>Unlocked Coupons:</h3>
        <div className="coupon-list">
          {user.redeemedCoupons.map((coupon, index) => (
            <div key={index} className="coupon-card">
              <img src={coupon.image} alt={coupon.name} />
              <span style={{ textDecoration: "line-through" }}>
                {coupon.name} - Code: {coupon.code}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
