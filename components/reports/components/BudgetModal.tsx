import { PresentationChartLineIcon } from "@heroicons/react/24/outline";
import ModalSkeleton from "../../ui/Modals/ModalSkeleton";
import ModalPrimaryButton from "../../ui/Buttons/ModalPrimaryButton";
import ModalSecondaryButton from "../../ui/Buttons/ModelSecondaryButton";
import Row from "../../ui/Containers/Row";
import Col from "../../ui/Containers/Col";
import NumberInput from "../../ui/Forms/NumberInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { budgetAtom } from "../../../atom/budgetAtom";
import { useEffect, useState } from "react";
import ToggleSwitch from "../../ui/Buttons/ToggleSwitch";

interface IFormInput {
  max_cost: number;
  max_energy: number;
  max_water: number;
}

export default function BudgetModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) {
  //state
  const [budget, setBudget] = useRecoilState(budgetAtom);
  const [budgetEnabled, setBudgetEnabled] = useState(budget.is_active);

  //form
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({});

  //when budget changes or modal opens, set form values
  useEffect(() => {
    setValue("max_cost", budget.max_cost);
    setValue("max_energy", budget.max_energy);
    setValue("max_water", budget.max_water);
  }, [open, budget]);

  //on submit, update budget
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setBudget({
      ...budget,
      max_cost: data.max_cost,
      max_energy: data.max_energy,
      max_water: data.max_water,
      is_active: budgetEnabled,
    });
    setOpen(false);
  };

  return (
    <ModalSkeleton
      open={open}
      setOpen={setOpen}
      heading={"Usage Budget"}
      message={
        "You can edit your usage budget here. Energy, water, and cost are tracked separately so you can moderate your usage indepedently of cost."
      }
      icon={<PresentationChartLineIcon className="h-full w-full" />}
    >
      <Col className="w-full items-center justify-center">
        <form
          className="w-full flex flex-col items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Col className="w-2/3 space-y-1 mt-8">
            <NumberInput
              label={"Max. Cost"}
              id={"max_cost"}
              min={0}
              step={10}
              placeholder={"0"}
              units="$"
              register={register}
              registerOptions={{ required: true }}
              errors={errors}
            />
            <NumberInput
              label={"Max. Energy"}
              id={"max_energy"}
              min={0}
              step={25}
              placeholder={"0"}
              units="kWh"
              register={register}
              registerOptions={{ required: true }}
              errors={errors}
            />
            <NumberInput
              label={"Max. Water"}
              id={"max_water"}
              min={0}
              step={100}
              placeholder={"0"}
              units="gal"
              register={register}
              registerOptions={{ required: true }}
              errors={errors}
            />
          </Col>
          <Row className="w-2/3 items-center justify-between pt-8 pb-4">
            <p className="block text-md font-medium leading-6 text-white">
              Budget Enabled:
            </p>
            <ToggleSwitch
              enabled={budgetEnabled}
              setEnabled={() => {
                setBudgetEnabled(!budgetEnabled);
              }}
            />
          </Row>
          <div className="flex w-full justify-end">
            <Row className="mt-5 w-1/2 items-center justify-center space-x-6">
              <ModalSecondaryButton onClick={() => setOpen(false)}>
                Cancel
              </ModalSecondaryButton>
              <ModalPrimaryButton type="submit">Save</ModalPrimaryButton>
            </Row>
          </div>
        </form>
      </Col>
    </ModalSkeleton>
  );
}
