import React, { useState, useEffect } from "react";
import { Node as NodeType, Open } from "../types/Node";
import Node from "../components/Node";
import { Typography, Box, Snackbar, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/configureStore";
import { checkNodesStatus, selectNodes } from "../reducers/nodes";

export const Nodes: React.FC = () => {
  const [expandedNodeURL, setExpandedNodeURL] = useState<null | string>(null);
  const [open, setOpen] = useState<Open[]>([]);
  const dispatch = useDispatch();
  const nodes = useAppSelector(selectNodes);

  useEffect(() => {
    dispatch(checkNodesStatus(nodes));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleNodeExpanded(node: NodeType) {
    setExpandedNodeURL(node.url === expandedNodeURL ? null : node.url);
  }

  useEffect(() => {
    let state = nodes.map((e: any) => {
      return {
        name: e.name,
        status: e.error?.length ? true : false,
      };
    });
    setOpen(state);
  }, [nodes]);

  function handleChange(node: NodeType) {
    setOpen(
      open.map((e: any) => {
        if (e.name === node.name) {
          return {
            name: e.name,
            status: false,
          };
        } else {
          return e;
        }
      })
    );
  }
  function returnState(node: NodeType) {
    return open.filter((e: any) => e.name === node.name)[0]?.status;
  }
  return (
    <Box paddingTop={7}>
      <Typography variant="h4" component="h1">
        <strong style={{ color: "#000" }}>Nodes</strong>
      </Typography>
      {nodes.map((node) => (
        <div key={node.url}>
          <Node
            node={node}
            key={node.url}
            expanded={node.url === expandedNodeURL}
            toggleNodeExpanded={toggleNodeExpanded}
          />
          <Snackbar
            open={returnState(node)}
            onClose={() => handleChange(node)}
            autoHideDuration={6000}
          >
            <Alert
              severity="error"
              sx={{ width: "100%" }}
              onClose={() => handleChange(node)}
            >
              {node.error} at Node {node.name}
            </Alert>
          </Snackbar>
        </div>
      ))}
    </Box>
  );
};

export default Nodes;
