import React from "react";

export default function MedicineList({ items, mode = "user", onEdit, onDelete, onToggleAvailable, onOrder, onShare }) {
  if (!items.length) return <div className="muted">No products</div>;
  
  // Helper function to calculate total price
  const calculateTotal = (item) => {
    const price = Number(item.price || 0);
    const gstPercent = Number(item.gst || 0);
    const deliveryCharge = Number(item.deliveryCharge || 0);
    const gstAmount = (price * gstPercent) / 100;
    return price + gstAmount + deliveryCharge;
  };
  
  return (
    <div className="grid">
      {items.map((m) => (
        <div className="card" key={m._id}>
          {m.imageUrl ? (
            <img src={m.imageUrl} alt={m.name} style={{ width: "100%", height: 160, objectFit: "cover", borderTopLeftRadius: 16, borderTopRightRadius: 16, display: "block" }} />
          ) : null}
          <div className="card-body">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div className="title">{m.name}</div>
              <span className="pill">{m.available ? "Available" : "Not Available"}</span>
            </div>
            <div className="muted" style={{ margin: "8px 0" }}>{m.benefits}</div>
            <div className="price-details" style={{ marginTop: 8 }}>
              <div className="muted" style={{ fontSize: 14 }}>MRP: ₹{Number(m.mrp || 0).toFixed(2)}</div>
              <div className="muted" style={{ fontSize: 14, marginTop: 2 }}>Price: ₹{Number(m.price || 0).toFixed(2)}</div>
              <div className="muted" style={{ fontSize: 14, marginTop: 2 }}>GST: {Number(m.gst || 0).toFixed(2)}%</div>
              <div className="muted" style={{ fontSize: 14, marginTop: 2 }}>Delivery: ₹{Number(m.deliveryCharge || 0).toFixed(2)}</div>
              <div className="muted" style={{ fontSize: 14, marginTop: 2 }}>Expiry: {m.expiry || "NA"}</div>
              <div className="price" style={{ fontSize: 18, fontWeight: 600, marginTop: 6 }}>Total: ₹{calculateTotal(m).toFixed(2)}</div>
            </div>
            {mode === "admin" ? (
              <div className="row" style={{ marginTop: 10 }}>
                <button className="btn-outline btn" onClick={() => onToggleAvailable && onToggleAvailable(m)}>{m.available ? "Mark Not Available" : "Mark Available"}</button>
                <button className="btn-outline btn" onClick={() => onEdit && onEdit(m)}>Edit</button>
                <button className="btn-outline btn" onClick={() => onDelete && onDelete(m)}>Delete</button>
              </div>
            ) : (
              <div className="row" style={{ marginTop: 10, gap: 8 }}>
                {m.available ? (
                  <>
                    <button className="btn btn-success" style={{ flex: 1 }} onClick={() => onOrder && onOrder(m)}>Order Now</button>
                    {onShare && (
                      <button className="btn-outline btn" style={{ flex: "0 0 auto", padding: "8px 16px" }} onClick={() => onShare(m)} title="Share this product">
                        📤 Share
                      </button>
                    )}
                  </>
                ) : (
                  <span className="muted">Not available</span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}