import { WalletModalProvider } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { clusterApiUrl } from '@solana/web3.js'
import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

export interface SolanaProviderContext {
  endpoint: string
}

const SolanaContext = createContext<SolanaProviderContext>({} as SolanaProviderContext)

export function SolanaProvider({ children }: { children: ReactNode }) {
  const [cluster] = useState<string | WalletAdapterNetwork>('devnet' as WalletAdapterNetwork)
  const endpoint = useMemo(() => {
    const value = cluster

    if (!value?.startsWith('http')) {
      return clusterApiUrl(cluster.toLowerCase() as WalletAdapterNetwork)
    }

    return value
  }, [cluster])

  const wallets = useMemo(
    () => [
      // Add more wallets here
    ],
    [],
  )

  const value: SolanaProviderContext = {
    endpoint,
  }

  return (
    <SolanaContext.Provider value={value}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </SolanaContext.Provider>
  )
}

export const useSolana = () => useContext(SolanaContext)
