import { useEffect, useState } from "react";
import axios from "axios";

export const useGetRequest = (url: string, repeat?: boolean) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [response, setResponse] = useState<any>(undefined);
  const [active, setActive] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        setResponse(res.data);
        console.log(res["data"], "DATA GET FROM HOOK");
        setTotal(res["data"]["key_ceremonies"][0]["number_of_guardians"]);
        setActive(
          // res["data"]["key_ceremonies"][0]["guardian_status"]["1"][
          //   "public_key_shared"
          // ] == "COMPLETE"
          //   ? 4
          //   : 0
          4
        );
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [url, repeat]);

  return { response, loading, error, active, total };
};
