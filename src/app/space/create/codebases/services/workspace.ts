export class Workspace {
  attributes: WorkspaceAttributes;
  links?: WorkspaceLinks;
  relationships?: WorkspaceRelationships;
  type: string;
}

export class WorkspaceAttributes {
  description?: string;
  status?: string;
  name?: string;
}

export class WorkspaceLinks {
  open?: string;
  self?: string;
  ide?: string;
}

export class WorkspaceRelationships {
  [name: string]: any;
}
