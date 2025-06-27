import './Skeleton.css'
import Skeleton from 'react-loading-skeleton';
//import 'react-loading-skeleton/dist/skeleton.css'; 

function SkeletonLoader() {
  return (
  <div className="skeleton-loader">
    <Skeleton className="skeleton-avatar" circle={true} />
    <Skeleton className="skeleton-title" />
    <div className="skeleton-content">
        <Skeleton className="skeleton-info delivery" />
        <Skeleton className="skeleton-info pay" />
        <Skeleton className="skeleton-info pay" />
    </div>
  </div>
  );
}

export default SkeletonLoader;
