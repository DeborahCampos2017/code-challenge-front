"use client"

import {
  Portal,
  Spinner,
  Stack,
  createStandaloneToast,
} from "@chakra-ui/react"

interface ToastProps {
  type?: "loading" | "success" | "error";
  title?: string;
  description?: string;
  action?: { label: string };
  closable?: boolean;
}

interface ToastComponents {
  Root: React.FC<{ children: React.ReactNode; width: string | number | undefined }>;
  Indicator: React.FC;
  Title: React.FC<{ children: React.ReactNode }>;
  Description: React.FC<{ children: React.ReactNode }>;
  ActionTrigger: React.FC<{ children: React.ReactNode }>;
  CloseTrigger: React.FC;
}

const Toast: ToastComponents = {
  Root: ({ children, width }: { children: React.ReactNode; width: string | number | undefined }) => (
    <div style={{ width }}>{children}</div>
  ),
  Indicator: () => <div>Indicator</div>,
  Title: ({ children }: { children: React.ReactNode }) => <h4>{children}</h4>,
  Description: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
  ActionTrigger: ({ children }: { children: React.ReactNode }) => <button>{children}</button>,
  CloseTrigger: () => <button>Close</button>,
};

export const toaster = createToastFn("ltr")
const { ToastContainer } = createStandaloneToast()
export const Toaster = () => {
  return (
    <Portal>

      <ToastContainer />
      <>
        {(toast: ToastProps) => (
          <>
            <Toast.Root width="sm">
              {toast.type === "loading" ? (
                <Spinner size="sm" color="blue.solid" />
              ) : (
                <Toast.Indicator />
              )}
              <Stack gap="1" flex="1" maxWidth="100%">
                {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
                {toast.description && (
                  <Toast.Description>{toast.description}</Toast.Description>
                )}
              </Stack>
              {toast.action && (
                <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
              )}
              {toast.closable && <Toast.CloseTrigger />}
            </Toast.Root>
          </>
        )}
      </>
    </Portal>
  )
}
function createToastFn(direction: string) {
  return {
    show: (toast: ToastProps) => {
      console.log(`Showing toast in ${direction} direction:`, toast);
    },
    hide: () => {
      console.log(`Hiding toast in ${direction} direction`);
    },
  };
}

