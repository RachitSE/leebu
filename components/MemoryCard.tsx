interface MemoryCardProps {
    title: string;
    caption: string;
    imageUrl: string;
  }
  
  const MemoryCard: React.FC<MemoryCardProps> = ({ title, caption, imageUrl }) => {
    return (
      <div className="memory-card group">
        <img
          src={imageUrl}
          alt={title}
          className="memory-image"
        />
        <div className="memory-content">
          <h3>{title}</h3>
          <p>{caption}</p>
        </div>
      </div>
    );
  };
  
  export default MemoryCard;
  