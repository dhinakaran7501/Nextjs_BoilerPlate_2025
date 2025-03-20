"use client";

import Loaders from "@/components/Loaders";
import axios from "axios";
import { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function ApiDocs() {
  const [spec, setSpec] = useState<any>(null);

  useEffect(() => {
    async function fetchSpec() {
      const response = await axios.get("/api/swagger");
      setSpec(response.data);
    }

    fetchSpec();
  }, []);

  if (!spec) {
    return <Loaders isVisible />;
  }

  return (
    <div className="bg-white min-h-max">
      <SwaggerUI spec={spec} />
    </div>
  );
}
