import React from 'react';

const StreamlitEmbed = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src="http://localhost:8501/"
        width="100%"
        height="100%"
        frameBorder="0"
        title="Streamlit App"
      />
    </div>
  );
};

export default StreamlitEmbed;
