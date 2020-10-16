import TermOfUse from '../../entity/term-of-use/class/term-of-use';

export default class TermOfUseService {
    async getApplicationTerm(): Promise<TermOfUse | null> {
        return new Promise((resolve, reject) => {
            resolve(null);
        })
    }
}