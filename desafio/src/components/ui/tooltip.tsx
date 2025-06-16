import { Tooltip as ChakraTooltip, Portal } from "@chakra-ui/react"
import * as React from "react"

type ChakraTooltipProps = React.ComponentPropsWithoutRef<typeof ChakraTooltip>;

export type TooltipProps = ChakraTooltipProps & {
  showArrow?: boolean
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
  content: React.ReactNode
  contentProps?: React.ComponentProps<typeof ChakraTooltip>
  disabled?: boolean
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props, ref) {
    const {
      showArrow,
      children,
      disabled,
      portalled = true,
      content,
      contentProps,
      portalRef,
      ...rest
    } = props

    if (disabled) return children

    return (
      <ChakraTooltip {...rest}>
        <span>{children}</span>
        {portalled ? (
          <Portal containerRef={portalRef}>
            <div ref={ref} {...(contentProps as React.HTMLAttributes<HTMLDivElement>)}>
              {showArrow && (
                <div className="tooltip-arrow">
                  <span className="tooltip-arrow-tip" />
                </div>
              )}
              {content}
            </div>
          </Portal>
        ) : (
          <div ref={ref} {...(contentProps as React.HTMLAttributes<HTMLDivElement>)}>
            {showArrow && (
              <div className="tooltip-arrow">
                <span className="tooltip-arrow-tip" />
              </div>
            )}
            {content}
          </div>
        )}
      </ChakraTooltip>
    )
  },
)
