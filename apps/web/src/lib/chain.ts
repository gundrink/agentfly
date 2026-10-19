/**
 * Public Solana identity for the site.
 *
 * The addresses are the devnet book this farm reads. They are public, so a missing
 * env value falls back to the deployed book rather than taking the homepage down.
 * Override any of them with the matching `NEXT_PUBLIC_` key.
 */

function pub(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim() ?? "";
  return trimmed || fallback;
}

export const publicChain = {
  cluster: pub(process.env.NEXT_PUBLIC_SOLANA_CLUSTER, "devnet"),
  rpcUrl: pub(process.env.NEXT_PUBLIC_SOLANA_RPC_URL, "https://api.devnet.solana.com"),
  programId: pub(
    process.env.NEXT_PUBLIC_SOLANA_PROGRAM_ID,
    "GRG9CqaYABVi2Z67CBFbkq9vHC8VJ2CtvCtmqs3woHqE",
  ),
  ca: pub(process.env.NEXT_PUBLIC_CA, "GRG9CqaYABVi2Z67CBFbkq9vHC8VJ2CtvCtmqs3woHqE"),
  xUrl: process.env.NEXT_PUBLIC_X_URL?.trim() ?? "",
  deployer: pub(process.env.NEXT_PUBLIC_DEPLOYER, "DCYGieAFCYNvmNRDj3Aoi4qTpZAVC4RsKbGUqDn4RJdp"),
  tokensPerSol: pub(process.env.NEXT_PUBLIC_TOKENS_PER_SOL, "100"),
} as const;

export const bookTokens = [
  {
    symbol: "nUSDC",
    decimals: 6,
    mint: pub(process.env.NEXT_PUBLIC_MINT_USDC, "AogEbswqviQNztUJJZziERHt2SbZMEFBqxj7wQfQLyg5"),
  },
  {
    symbol: "nUSDT",
    decimals: 6,
    mint: pub(process.env.NEXT_PUBLIC_MINT_USDT, "FNEBoyu8SpihwkA5ApDii13MHwK1scKmrGsefXPkC1ru"),
  },
  {
    symbol: "nPYUSD",
    decimals: 9,
    mint: pub(process.env.NEXT_PUBLIC_MINT_PYUSD, "6EVpJryaSzY29qyJQwWQbMt8AbtBSQrZcMkAdHMMbZMn"),
  },
  {
    symbol: "nUSDe",
    decimals: 9,
    mint: pub(process.env.NEXT_PUBLIC_MINT_USDE, "AtKin6p4ecibN42YPBN1gdgBwwU69cWqdWewj7x4tphR"),
  },
] as const;

export const floors = [
  { price: "$0.9995", share: "40%" },
  { price: "$0.9990", share: "27%" },
  { price: "$0.9950", share: "15%" },
  { price: "$0.9900", share: "8%" },
  { price: "$0.9800", share: "4%" },
  { price: "$0.9500", share: "3%" },
  { price: "$0.9000", share: "2%" },
  { price: "Full range", share: "1%" },
] as const;
