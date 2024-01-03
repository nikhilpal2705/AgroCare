import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function NotFound({ entity = '' }) {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title={"Error 404 - Page Not Found"}
      subTitle={"Sorry the Page you requested does not exist"}
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate(`/${entity?.toLowerCase()}`);
          }}
        >
          {"Back"}
        </Button>
      }
    />
  );
}
