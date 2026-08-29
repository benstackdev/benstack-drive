import { Field } from "../ui/field";
import { Input } from "../ui/input";

export function DriveSearchbar() {
  // Input onChange updates "query" state
  return (
    <Field className="">
      <Input
        id="search"
        name="search"
        placeholder="Type to search..."
        className="rounded-lg" />
    </Field>
  );
}