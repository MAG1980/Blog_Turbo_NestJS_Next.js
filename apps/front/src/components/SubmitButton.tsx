import { Button, ButtonProps } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

function SubmitButton({ children, ...props }: ButtonProps) {
  //Возвращает информацию о статусе ближайшей родительской формы
  //const { pending, data, method, action } = useFormStatus();
  const { pending } = useFormStatus()
  return (
    <Button type="submit" aria-disabled={ pending } { ...props }>
      { pending ? ( <span className="animate-pulse">Отправка данных...</span> )
        : children }
    </Button>
  );
}

export default SubmitButton;