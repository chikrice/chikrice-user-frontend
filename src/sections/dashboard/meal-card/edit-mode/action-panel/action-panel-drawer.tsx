import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { ReactNode, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { m, AnimatePresence } from 'framer-motion';

import type { Theme } from 'src/theme';

interface ActionPanelDrawerProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  height?: string;
  onExited?: () => void;
}

export default function ActionPanelDrawer({
  children,
  open,
  onClose,
  height = '40svh',
  onExited,
}: ActionPanelDrawerProps) {
  const theme = useTheme();
  const drawerRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence onExitComplete={onExited}>
      {open && (
        <m.div
          key="overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1200,
            pointerEvents: 'none',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <m.div
            key="drawer"
            ref={drawerRef}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              height,
              backgroundColor: theme.palette.background.default,
              borderTopLeftRadius: '30px',
              borderTopRightRadius: '30px',
              boxShadow: theme.customShadows.bottomNav,
              zIndex: 1201,
              pointerEvents: 'auto',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              if (info.offset.y > 50) {
                onClose();
              }
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
            }}
          >
            <StyledDrawerCloseBar />
            {children}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

const StyledDrawerCloseBar = styled(Box)(({ theme }: { theme?: Theme }) => ({
  height: '4px',
  width: '60px',
  borderRadius: '8px',
  backgroundColor: theme.palette.grey[400],
  marginTop: 8,
  marginBottom: 12,
  alignSelf: 'center',
}));
