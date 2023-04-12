import React from 'react';
import { DataTableCell } from '@salesforce/design-system-react';

const LinkCell = ({ children, ...props }) => {
  let label = 'View';

  if (!props.linkLabel && !props.assetTwo)
    label = props.item.asset;
  else if (!props.linkLabel && props.assetTwo)
    label = props.item.assetTwo

  return (
    <DataTableCell {...props}>
      <a 
        href={`${props.prefix}/${children}`}
        target={props.sameTab ? "_self" : "_blank"}
        rel="noreferrer"
        title={`${props.prefix}/${children}`}
      >{label}</a>
    </DataTableCell>
  );
}

LinkCell.displayName = DataTableCell.displayName;

export default LinkCell;