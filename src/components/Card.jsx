import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./DataMap";

const Card = ({ entry, index, moveCard }) => {
  const cardRef = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id: entry.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item) {
      // item is the dragged element
      if (!cardRef.current) {
        return;
      }
      const dragIndex = item.index;
      // current element where the dragged element is hovered on
      const hoverIndex = index;
      // If the dragged element is hovered in the same place, then do nothing
      if (dragIndex === hoverIndex) {
        return;
      }
      // If it is dragged around other elements, then move the image and set the state with position changes
      moveCard(dragIndex, hoverIndex);
      /*
        Update the index for dragged item directly to avoid flickering
        when the image was half dragged into the next
      */
      item.index = hoverIndex;
    },
  });

  drag(drop(cardRef));

  return (
    <div
      ref={cardRef}
      style={{
        opacity: isDragging ? 0.8 : 1,
        cursor: "move",
      }}
      key={entry.id}
      className="md:h-[150px] w-full flex flex-col md:flex-row gap-x-8 items-center text-base md:text-[14px] mb-4 border-2 rounded-[24px] p-4 overflow-hidden"
    >
      <span className="w-[5%] hidden md:block">{index + 1}</span>
      <span className="w-[200px] h-[150px] rounded-[8px] mb-4 md:mb-0 md:w-[15%] md:h-[100px] overflow-hidden ">
        <img
          src={entry.photo}
          alt={`${entry.username} photo`}
          className="object-cover"
        />
      </span>
      <span className="w-[40%] text-[20px] text-center md:text-left">
        {entry.title}
      </span>

      <span className="block md:hidden">Author: {entry.username}</span>
      <span className="hidden md:inline w-[10%] text-[20px]">
        {entry.username}
      </span>

      <span className="block md:hidden">Likes: {entry.like}</span>
      <span className="hidden md:block w-[10%] text-right">{entry.like}</span>
    </div>
  );
};

export default Card;
