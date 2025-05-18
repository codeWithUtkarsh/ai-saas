import React from "react";

interface MockMasterLayoutProps {
  children: React.ReactNode;
}

const MockMasterLayout = ({ children }: MockMasterLayoutProps) => {
  return (
    <div className="mockmaster-layout">
      {children}
    </div>
  );
};

export default MockMasterLayout;