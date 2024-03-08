import React from 'react';
import { DataTableCell } from '@salesforce/design-system-react';

const LinkDataCell = ({ children, ...props }) => {
  let label = 'View';

  if (!props.linkLabel && !props.assetTwo)
    label = props.item.asset;
  else if (!props.linkLabel && props.assetTwo)
    label = props.item.assetTwo

  return (
    <DataTableCell {...props}>
      <a 
        href={props.prefix + "/" + children}
        target={props.sameTab ? "_self" : "_blank"}
        rel="noreferrer"
        style={{ zIndex: '10'}}
      >{label}</a>
    </DataTableCell>
  );
}

LinkDataCell.displayName = DataTableCell.displayName;

export default LinkDataCell;