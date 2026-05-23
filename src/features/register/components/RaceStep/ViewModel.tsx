import { RacesEntity } from "@/src/shared/entities";
import { useQuery } from "@tanstack/react-query";
import { getRaces } from "../../api/register.api";

const ViewModel = () => {
  const { data: raceData, error: raceError } = useQuery({
    queryKey: ["races"],
    queryFn: getRaces,
  });

  const parsedRaces = raceData
    ? raceData.result.map((element: RacesEntity) => ({
        value: element.id,
        label: element.race,
      }))
    : [];

  return { parsedRaces };
};

export default ViewModel;
