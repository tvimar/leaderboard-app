import { useState, useEffect } from 'react';

function QrCodeViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [qrCodes, setQrCodes] = useState([]);
  const [selectedQr, setSelectedQr] = useState(null);

  const fetchQrCodes = () => {
    fetch('http://localhost:8000/api/qr-codes')
      .then(res => res.json())
      .then(data => setQrCodes(data));
  };

  const handleOpen = () => {
    setIsOpen(true);
    fetchQrCodes();
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedQr(null);
  };
  const handleSelectQr = (filename) => {
    // Extract just the filename from the path and encode it for the URL
    const baseFilename = filename.split('/').pop();
    const encodedFilename = encodeURIComponent(baseFilename);
    setSelectedQr(`http://localhost:8000/api/qr-codes/${encodedFilename}`);
  };

  if (!isOpen) {
    return (
      <button className="word-btn" onClick={handleOpen}>
        View QR Codes
      </button>
    );
  }

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div className="modal-content" style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>QR Codes</h2>
          <button className="word-btn" onClick={handleClose}>
            Close
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div style={{ flex: '1' }}>
            <h3>Files</h3>
            <div style={{ 
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '1rem',
              maxHeight: '300px',
              overflow: 'auto'
            }}>
              {qrCodes.length === 0 ? (
                <p>No QR codes found</p>
              ) : (
                qrCodes.map((file) => (
                  <div 
                    key={file}
                    onClick={() => handleSelectQr(file)}
                    style={{
                      padding: '0.5rem',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      ':hover': {
                        backgroundColor: '#f0f0f0'
                      }
                    }}
                  >
                    {file.split('/').pop()}
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div style={{ flex: '1' }}>
            <h3>Preview</h3>
            <div style={{
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '1rem',
              minHeight: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>              {selectedQr ? (
                <img 
                  src={selectedQr} 
                  alt="QR Code"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto'
                  }}
                  onError={(e) => {
                    console.error('Error loading QR code:', e);
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
              ) : (
                <p>Select a QR code to preview</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QrCodeViewer;
