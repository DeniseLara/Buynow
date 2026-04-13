import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <Skeleton height={200} borderRadius={8} /> 
      <Skeleton height={20} style={{ marginTop: '1rem' }} /> 
      <Skeleton width="60%" height={20} /> 
    </div>
  );
}

export default SkeletonCard;
