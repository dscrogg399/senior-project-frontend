import Col from "../../ui/Containers/Col";
import Panel from "../../ui/Containers/Panel";
import SubPanel from "../../ui/Containers/SubPanel";
import PanelLabel from "../../ui/Labels/PanelLabel";
import { useForm } from "react-hook-form";
import NumberSelector from "../../ui/Forms/NumberSelector";
import PrimaryButton from "../../ui/Buttons/PrimaryButton";

// form input interface
interface IFormInput {
  target_temp: number;
  min_temp: number;
  max_temp: number;
}

export default function Thermostat() {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      target_temp: 72,
      min_temp: 65,
      max_temp: 75,
    },
  });

  return (
    <Panel className="pb-2">
      <PanelLabel>Thermostat</PanelLabel>
      <Col className="w-full h-full  mt-2 justify-start items-center">
        <SubPanel className="w-2/3 items-center p-8 bg-gray-600">
          <h3 className="text-3xl font-semibold lg:text-4xl">72</h3>
        </SubPanel>
        <form className="w-2/3 h-full lg:w-5/6">
          <div className="flex flex-col h-full items-center justify-evenly">
            <NumberSelector
              label={"Min. Temperature"}
              id={"min_temp"}
              setValue={setValue}
              watch={watch}
              min={50}
              max={watch("target_temp") - 1}
            />
            <NumberSelector
              label={"Target Temperature"}
              id={"target_temp"}
              setValue={setValue}
              watch={watch}
              min={watch("min_temp") + 1}
              max={watch("max_temp") - 1}
            />
            <NumberSelector
              label={"Max. Temperature"}
              id={"max_temp"}
              setValue={setValue}
              watch={watch}
              min={watch("target_temp") + 1}
              max={90}
            />
            <div className="w-full lg:w-2/3">
              <PrimaryButton>Set Thermostat</PrimaryButton>
            </div>
          </div>
        </form>
      </Col>
    </Panel>
  );
}
