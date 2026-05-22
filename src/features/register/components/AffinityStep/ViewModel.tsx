import { AffinityEntity } from "@/src/shared/entities";
import { useQuery } from "@tanstack/react-query";
import { getAffinities } from "../../api/register.api";

const ViewModel = () => {
  const { data: affinityData } = useQuery({
    queryKey: ["races"],
    queryFn: getAffinities,
  });

  const parsedAffinities = affinityData
    ? affinityData.result.map((element: AffinityEntity) => ({
        value: element.id,
        label: element.name,
      }))
    : [];

  return { parsedAffinities };
};

export default ViewModel;
