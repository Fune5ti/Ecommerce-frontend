import { Result } from "antd";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <Result
      title="Sorry, an unexpected error has occurred."
      subTitle={(error as any).statusText || (error as any).message}
    />
  );
}
