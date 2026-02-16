import { useState } from 'react';

/**
 * Maps ticker/name to spothq cryptocurrency-icons IDs.
 * Only includes tickers confirmed to exist on the CDN.
 * Missing tickers fall back to a colored letter box.
 */
const ICON_MAP: Record<string, string> = {
  BTC: 'btc', B: 'btc', BITCOIN: 'btc',
  ETH: 'eth', E: 'eth', ETHEREUM: 'eth',
  SOL: 'sol', S: 'sol', SOLANA: 'sol',
  AVAX: 'avax', AVALANCHE: 'avax',
  LINK: 'link', L: 'link', CHAINLINK: 'link',
  DOT: 'dot', D: 'dot', POLKADOT: 'dot',
  UNI: 'uni', U: 'uni', UNISWAP: 'uni',
  AAVE: 'aave',
  MKR: 'mkr', MAKER: 'mkr',
  DOGE: 'doge',
  APE: 'ape', APECOIN: 'ape',
  USDT: 'usdt',
  KSM: 'ksm',
};

interface CryptoIconProps {
  readonly symbol: string;
  readonly name?: string;
  readonly color?: string;
  readonly size?: number;
  readonly className?: string;
}

export const CryptoIcon: React.FC<CryptoIconProps> = ({
  symbol,
  name,
  color,
  size = 32,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  const key = symbol.toUpperCase();
  const nameKey = name?.toUpperCase() ?? '';
  const iconId = ICON_MAP[key] || ICON_MAP[nameKey];

  // Fallback: show the letter in a colored box
  if (!iconId || imgError) {
    return (
      <div
        className={`rounded flex items-center justify-center font-mono font-bold ${className}`}
        style={{
          width: size,
          height: size,
          fontSize: size * 0.4,
          borderColor: color ? `${color}66` : 'rgba(255,255,255,0.1)',
          color: color || '#fff',
          backgroundColor: color ? `${color}1a` : 'rgba(255,255,255,0.05)',
          border: '1px solid',
        }}
      >
        {symbol.charAt(0)}
      </div>
    );
  }

  const url = `https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color/${iconId}.svg`;

  return (
    <div
      className={`rounded-full overflow-hidden flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={url}
        alt={name || symbol}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setImgError(true)}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default CryptoIcon;
