import { Link } from 'react-router-dom';

const ScoreList = ({
thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!thoughts.length) {
    return <h3>No scores saved yet!</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            {/* {thought.thoughtAuthor} */}
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${thought.thoughtAuthor}`}
                >
                  {thought.thoughtAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this thought on {thought.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <p> Words scored on {thought.createdAt}: {thought.thoughtText}</p>
                  <p> Words per minute: {thought.thoughtText * 2} </p>
                  <br></br>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">

            </div>

          </div>
        ))}
    </div>
  );
};

export default ScoreList;
