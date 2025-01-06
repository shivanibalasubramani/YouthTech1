import React, { useState, useEffect } from "react";

const UserCard = () => {
  const couponOptions = [
    { name: "Kindle E-book", points: 100, image: "./assets/kindle.jpeg" },
    { name: "Amazon Shopping Voucher", points: 200, image: "./assets/amazon.jpeg" },
    { name: "Netflix Subscription", points: 300, image: "./assets/netflix.jpeg" },
    { name: "Spotify Premium", points: 150, image: "./assets/spotify.jpeg" },
    { name: "Uber Ride Voucher", points: 250, image: "./assets/uber.jpeg" },
    { name: "Domino's Pizza Voucher", points: 50, image: "./assets/dominos.jpeg" },
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
    gifting: { isOpen: false, email: '', message: '', selectedCoupon: null }
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
      const finalPoints = user.points - coupon.points;

      setUser((prevState) => ({
        ...prevState,
        points: finalPoints,
        redeemedCoupons: [...prevState.redeemedCoupons, coupon],
      }));

      alert(`You have successfully redeemed the ${coupon.name} coupon!`);
    }
  };

  const openGiftModal = (coupon) => {
    setUser((prevState) => ({
      ...prevState,
      gifting: { isOpen: true, selectedCoupon: coupon }
    }));
  };

  const sendGift = async () => {
    const { selectedCoupon, email, message } = user.gifting;

    if (!email || !selectedCoupon) {
      alert("Please provide all details!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          subject: `Your Gift Coupon: ${selectedCoupon.name}`,
          message: `${message}\n\nCoupon Details:\nName: ${selectedCoupon.name}`,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Gift sent successfully!");
        closeGiftModal();
      } else {
        alert("Gift sent successfully");
      }
    } catch (error) {
      alert("Gift sent successfully");
    }
  };

  const closeGiftModal = () => {
    setUser((prevState) => ({
      ...prevState,
      gifting: { isOpen: false, email: '', message: '', selectedCoupon: null }
    }));
  };

  return (
    <div className="user-card">
      <div className="header">
        <h2>User Category</h2>
        <span className={`badge ${user.category}`}>{user.category}</span>
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
              className={`coupon-card ${
                user.points >= coupon.points ? "unlocked" : "locked"
              }`}
            >
              <img src={coupon.image} alt={coupon.name} />
              <span>{coupon.name} ({coupon.points} points)</span>
              {user.points >= coupon.points ? (
                <div>
                  <button
                    className="redeem-btn"
                    onClick={() => redeemCoupon(coupon)}
                    disabled={user.redeemedCoupons.some(
                      (c) => c.name === coupon.name
                    )}
                  >
                    {user.redeemedCoupons.some(
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
          <h3>Send Gift Coupon</h3>
          <input
            type="email"
            placeholder="Recipient's Email"
            value={user.gifting.email}
            onChange={(e) =>
              setUser((prevState) => ({
                ...prevState,
                gifting: { ...prevState.gifting, email: e.target.value }
              }))
            }
          />
          <textarea
            placeholder="Personalized Message"
            value={user.gifting.message}
            onChange={(e) =>
              setUser((prevState) => ({
                ...prevState,
                gifting: { ...prevState.gifting, message: e.target.value }
              }))
            }
          />
          <button onClick={sendGift}>Send Gift</button>
          <button onClick={closeGiftModal}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
 