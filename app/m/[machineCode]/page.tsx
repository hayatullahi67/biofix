import { MachinePublicView } from "@/components/machine/machine-public-view";

export default async function MachinePage({ params }: PageProps<"/m/[machineCode]">) {
  const { machineCode } = await params;
  return <MachinePublicView code={decodeURIComponent(machineCode)} />;
}
