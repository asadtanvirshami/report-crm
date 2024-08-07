import { Toaster } from "@/components/ui/toaster";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const layout = (props: Props) => {
  return (
    <>
      {props.children}
      <Toaster />
    </>
  );
};

export default layout;
