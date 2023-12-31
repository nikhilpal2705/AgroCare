import { useLocation, Link } from 'react-router-dom';

/**
 * "Not Found" aka "Error 404" view
 */
const NotFoundView = () => {
  // document.title = "Page Not Found";
  const location = useLocation();
  return (
    <div>
      <p>
        You've called the <b>{location?.pathname}</b> url that doesn't exist
      </p>
      <p>
        Go to <Link to="/">home page</Link>
      </p>
    </div>
  );
};

export default NotFoundView;
