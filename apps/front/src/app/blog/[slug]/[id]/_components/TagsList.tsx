import { TagEntity } from "server/dist/src/tag/entities/tag.entity";

type Props = {
  tags: TagEntity[]
};

function TagsList({ tags }: Props) {
  return (
<div className="flex flex-row-reverse">
  <div className="flex justify-end flex-wrap w-1/2 gap-2">{ tags.map(tag => (
    <p className="bg-emerald-400 px-3 rounded-md" key={ tag.id }>{ tag.name }</p>
  ))
  }</div>
</div>
  );
}

export default TagsList;