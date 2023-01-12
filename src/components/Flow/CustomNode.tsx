import { memo, FC, CSSProperties } from "react";
import { Handle, Position, NodeProps } from "reactflow";

const sourceHandleStyleA: CSSProperties = { left: 50 };
const sourceHandleStyleB: CSSProperties = {
  right: 50,
  left: "auto",
};

const BranchNode: FC<NodeProps> = ({ data, xPos, yPos }) => {
  return (
    <div style={{ width: "100%" }}>
      <Handle type="target" position={Position.Top} />
      {/* <div>
        <div>
          Pointer: <strong>{data.Name}</strong>
        </div>
      </div> */}
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {data.map((el: string) => {
          const [leftThing, rightThing] = el.split("      ");
          return (
            <div className="pointerItem">
              <div>{leftThing}</div>
              <div>{rightThing}</div>
            </div>
          );
        })}
      </div>

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
};

const FunctionNode: FC<NodeProps> = ({ data, xPos, yPos }) => {
  return (
    <div style={{ width: "100%" }}>
      {/* <Handle type="target" position={Position.Top} /> */}
      <div>
        <div>
          Pointer: <strong>{data.ptr}</strong>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {data.code?.map((el: string) => {
          const [leftThing, rightThing] = el.split("      ");
          return (
            <div className="pointerItem">
              <div>{leftThing}</div>
              <div>{rightThing}</div>
            </div>
          );
        })}
      </div>

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
};

export const BranchBlock = memo(BranchNode);
export const FunctionBlock = memo(FunctionNode);
