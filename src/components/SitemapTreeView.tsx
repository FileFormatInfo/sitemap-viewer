'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { TreeItem2, TreeItem2Props } from '@mui/x-tree-view/TreeItem2';
import { useTreeItem2 } from '@mui/x-tree-view/useTreeItem2';
import NextLink from 'next/link';

type SitemapTreeViewProps = {
  items: TreeViewBaseItem[]
}

function onClick(e: React.MouseEvent, itemId: string) {
  console.log(`clicked on ${JSON.stringify(itemId)}`);
}

interface CustomLabelProps {
  children: string;
  className: string;
  numberOfChildren: number;
  url: string;
}

function CustomLabel({ children, url, className, numberOfChildren }: CustomLabelProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      spacing={4}
      flexGrow={1}
      className={className}
    >
      {url ? <Typography component={NextLink} href={url}>{children}</Typography>
        : <Typography>{children}</Typography>}

      {numberOfChildren > 0 ? <Chip label={numberOfChildren} size="small" /> : <></>}
    </Stack>
  );
}

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: TreeItem2Props,
  ref: React.Ref<HTMLLIElement>,
) {
  const { publicAPI } = useTreeItem2(props);

  const childrenNumber = publicAPI.getItemOrderedChildrenIds(props.itemId).length;
  const item = publicAPI.getItem(props.itemId);
  const url = item.hasEntry ? item.id : '';
  console.log(`item: ${JSON.stringify(item)}`);

  return (
    <TreeItem2
      {...props}
      ref={ref}
      slots={{
        label: CustomLabel,
      }}
      slotProps={{
        label: { numberOfChildren: childrenNumber, url } as CustomLabelProps,
      }}
    />
  );
});

export default function BasicRichTreeView({ items }: SitemapTreeViewProps) {
  return (
      <RichTreeView
        expansionTrigger="iconContainer"
        slots={{ item: CustomTreeItem }}
        items={items} onItemClick={onClick} />
  );
}