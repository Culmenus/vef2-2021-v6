import { NextApiRequest, NextApiResponse } from 'next';
import { fetchCharacters } from '../../lib/swapi';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const after = req.query?.after as string | null;
  // TODO sækja næstu síðu af gögnum hér
  // console.log('after>>',req.query);
  // console.log('after>>',after);
  try {
    const charData = await fetchCharacters(after ?? '');
    res.status(200).json({ success: true, data: charData });
  } catch {
    res.status(500).json({ success: false });
  }
};
