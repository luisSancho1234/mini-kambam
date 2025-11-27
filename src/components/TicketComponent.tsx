import { faAdd, faAngleDown, faArchive, faCircle, faDatabase, faFilter, faGear, faLayerGroup, faSignOut} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface TicketInfo{
  name: string;
  code: string;
  description: string;
  prioridade: string;
  projeto: string;
}

interface Props{
  ticketInfo: TicketInfo;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
}

function TicketComponent(props: Props) {
  return (
    <div
      draggable={props.draggable}
      onDragStart={props.onDragStart}
      className={`flex w-full flex-col shadow-sm gap-1 text-start py-1 px-1.5 bg-[#d9d9d9]`}
    >
      <div className="flex gap-1 flex-wrap">
        <p className="text-xs text-[#4C4C4C]  ">
          {props.ticketInfo.code ? props.ticketInfo.code : "CB-123"}
        </p>
        <p className="text-xs font-semibold text-black  ">
          {props.ticketInfo.name ? props.ticketInfo.name : "No Name"}
        </p>
      </div>
      <p className="text-xs font-extralight text-black line-clamp-3">
        {props.ticketInfo.description
          ? props.ticketInfo.description
          : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut ligula in elit efficitur imperdiet viverra at eros. Sed tincidunt enim vel sapien eleifend sagittis. Integer luctus, justo et "}
      </p>
      <div className="flex gap-2 flex-wrap">
        {props.ticketInfo.prioridade && (
          <div className="flex items-center justify-start text-xs gap-0.5">
            <FontAwesomeIcon
              icon={faCircle}
              className={` text-[10px]
            ${
              props.ticketInfo.prioridade === "baixa"
                ? "text-blue-500"
                : props.ticketInfo.prioridade === "normal"
                ? "text-green-500"
                : props.ticketInfo.prioridade === "alta"
                ? "text-red-400"
                : ""
            }
        `}
            />
            <p className=" font-extralight text-[#4C4C4C] line-clamp-3">
              {props.ticketInfo.prioridade}
            </p>
          </div>
        )}
        {!props.ticketInfo.projeto && (
          <div className="flex items-center justify-start text-xs gap-0.5">
            <FontAwesomeIcon
              icon={faDatabase}
              className={` text-[10px]
            ${
              props.ticketInfo.prioridade === "baixa"
                ? "text-blue-500"
                : props.ticketInfo.prioridade === "normal"
                ? "text-blue-500"
                : props.ticketInfo.prioridade === "alta"
                ? "text-red-400"
                : ""
            }
        `}
            />
            <p className=" font-extralight text-[#4C4C4C] line-clamp-3">
              {"database"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketComponent
