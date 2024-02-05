interface Props {
  params: {
    id: string;
  };
}

export default function ActivationPage({ params }: Props) {
  return <div>{params.id}</div>;
}
