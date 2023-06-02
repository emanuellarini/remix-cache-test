type TargetGroup = {
  id: number;
  name: string;
  project: Project;
  earningsPerClick: number;
};

type Project = {
  id: number;
  name: string;
  targetGroups?: TargetGroup[];
  purchaseOrderNumber: string;
  jobNumber: string;
};