import React, { useEffect, useState } from "react";
import { Badge } from "../Badge";

type ResultsForProps = {
  resultsFor: string;
};

const ResultsFor = ({ resultsFor }: ResultsForProps) => {
  return <Badge label={resultsFor} size="badge-lg" />;
};

export default ResultsFor;
